import bcrypt from 'bcryptjs';
import { getJwtToken, setJwtToken } from '../utils/jwtToken.js';
import { User } from '../models/index.js';
import logger from '../helper/logger.js';

export const register = async (req, res) => {
    try {
        const { firstName, email, phoneNumber, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser && existingUser.email && existingUser.email.trim() !== '') {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, email, phoneNumber, password: hash });
        res.json({ data: { id: user.userId, firstName: user.firstName, email: user.email, phoneNumber: user.phoneNumber }, status: true });
    } catch (err) {
        logger.error('Registration error:', err);
        res.status(400).json({ message: err.message || 'Registration failed' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info('User login attempt:', req.body); 

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid Username', isLoggedIn: false, status: 401 });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid Password', isLoggedIn: false, status: 401 });
        const tokenData = { id: user.userId, email: user.email, firstName: user.firstName };
        const token = await getJwtToken(tokenData);
        await setJwtToken(token, user.userId);
        res.status(200).json({ status: true, data : { token, isLoggedIn: true } });
    } catch (err) {
        logger.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error', isLoggedIn: false, status: 500 });
    }
}