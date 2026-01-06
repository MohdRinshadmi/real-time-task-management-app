import jwt from 'jsonwebtoken';
import logger from '../helper/logger.js';
import { getFromDb } from '../utils/jwtToken.js';
import { errorMessage } from '../helper/response.js';

const JWT_SECRET = process.env.JWT_SECRET; // must match getJwtToken
logger.info("[authMiddleware] JWT_SECRET:", JWT_SECRET);

export default async (req, res, next) => {
  try {
    let token = null;

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (req.headers['access-token']) {
      token = String(req.headers['access-token']).trim();
    }

    logger.info('[authMiddleware] Incoming token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // 1) Verify JWT signature & expiration
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      logger.info('[authMiddleware] Decoded JWT:', decoded);
    } catch (e) {
      logger.error('[authMiddleware] JWT verification failed:', e);
      const resp = await errorMessage({ code: 1002 }); // invalid token
      return res.status(401).json(resp);
    }

    // 2) Check DB (revocation / device control)
    const tokenRow = await getFromDb(token);
    logger.info('[authMiddleware] DB lookup result:', tokenRow);
    const storedToken = tokenRow?.token?.trim() || '';

    logger.info('[authMiddleware] Stored token from DB:', storedToken);

    if (!storedToken || storedToken !== token) {
      logger.error('[authMiddleware] Token mismatch or not found in DB.');
      const resp = await errorMessage({ code: 1002 });
      return res.status(401).json(resp);
    }

    req.auth = {
      token,
      user: decoded // { id, email, firstName, ... }
    };

    return next();
  } catch (err) {
    logger.error('Auth middleware error:', err);
    const resp = await errorMessage({ code: 1076 });
    return res.status(401).json(resp);
  }
};
