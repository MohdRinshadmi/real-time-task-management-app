import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import logger from '../helper/logger.js';
import { getJwtToken, setJwtToken } from '../utils/jwtToken.js';
import errorCode from '../helper/errorCode.js';

export const register = async (req, res) => {
  try {
    const { firstName, email, phoneNumber, password, privacyAccepted } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (String(privacyAccepted) !== "true") {
      return res.status(400).json({ message: 'You must accept the privacy policy to register' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, email, phoneNumber, password: hash, privacyAccepted });

    return res.status(201).json({ status: true, data: { id: user.userId, firstName: user.firstName, email: user.email, phoneNumber: user.phoneNumber } });
  } catch (err) {
    logger.error('Registration error:', err);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required', isLoggedIn: false });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password', isLoggedIn: false });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid username or password', isLoggedIn: false });
    }

    const tokenPayload = { id: user.userId, email: user.email, firstName: user.firstName };
    const token = await getJwtToken(tokenPayload);
    await setJwtToken(token, user.userId);
    return res.status(200).json({ status: true, data: { token, isLoggedIn: true, firstName: user.firstName } });
  } catch (err) {
    logger.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error', isLoggedIn: false });
  }
};

// Google OAuth controller
export const googleAuthController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: errorCode[1077] });
    }
    let firstName = req.user.firstName;
    logger.info('Google Auth user:', req.user);
    if (!firstName) {
      // Fetch user from DB if firstName is missing
      const dbUser = await User.findOne({ where: { email: req.user.email } });
      firstName = dbUser ? dbUser.firstName : undefined;
    }
    const tokenPayload = { id: req.user.id || req.user.userId, email: req.user.email, firstName };
    const token = await getJwtToken(tokenPayload);
    await setJwtToken(token, tokenPayload.id);
    return res.status(200).json({ status: true, data: { token, user: req.user, firstName } });
  } catch (err) {
    logger.error('Google Auth error:', err);
    return res.status(500).json({ message: errorCode[1077] });
  }
};

// Facebook OAuth controller
export const facebookAuthController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: errorCode[1078] });
    }
    let firstName = req.user.firstName;
    if (!firstName) {
      // Fetch user from DB if firstName is missing
      const dbUser = await User.findOne({ where: { email: req.user.email } });
      firstName = dbUser ? dbUser.firstName : undefined;
    }
    const tokenPayload = { id: req.user.id || req.user.userId, email: req.user.email, firstName };
    const token = await getJwtToken(tokenPayload);
    await setJwtToken(token, tokenPayload.id);
    return res.status(200).json({ status: true, data: { token, user: req.user, firstName } });
  } catch (err) {
    logger.error('Facebook Auth error:', err);
    return res.status(500).json({ message: errorCode[1078] });
  }
};
