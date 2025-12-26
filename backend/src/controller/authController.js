import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import logger from '../helper/logger.js';
import { getJwtToken, setJwtToken } from '../utils/jwtToken.js';

export const register = async (req, res) => {
  try {
    const { firstName, email, phoneNumber, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      email,
      phoneNumber,
      password: hash
    });

    return res.status(201).json({
      status: true,
      data: {
        id: user.userId,
        firstName: user.firstName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (err) {
    logger.error('Registration error:', err);
    return res
      .status(500)
      .json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info('User login attempt:', { email });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required', isLoggedIn: false });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid username or password', isLoggedIn: false });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(401)
        .json({ message: 'Invalid username or password', isLoggedIn: false });
    }

    const tokenPayload = {
      id: user.userId,
      email: user.email,
      firstName: user.firstName
    };

    const token = await getJwtToken(tokenPayload);
    // optional: store for revocation / multi-device management
    await setJwtToken(token, user.userId);

    return res.status(200).json({
      status: true,
      data: {
        token,
        isLoggedIn: true
      }
    });
  } catch (err) {
    logger.error('Login error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', isLoggedIn: false });
  }
};
