import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import logger from '../helper/logger.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ userName: name, email, password: hash });
        res.json({ id: user.userId, name: user.userName, email: user.email });
    } catch (err) {
        logger.error('Registration error:', err);
        res.status(400).json({ message: 'Email already in use' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info('User login attempt:', req.body);

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid Username' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid Password' });
        const token = jwt.sign({ id: user.userId, email: user.email, name: user.userName }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        logger.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}