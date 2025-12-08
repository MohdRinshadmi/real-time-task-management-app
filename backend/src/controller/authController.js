import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();


export async function register(req, res) {
const { name, email, password } = req.body;
const hash = await bcrypt.hash(password, 10);
try {
const user = await User.create({ name, email, passwordHash: hash });
res.json({ id: user.id, name: user.name, email: user.email });
} catch (err) {
res.status(400).json({ message: 'Email already in use' });
}
}


export async function login(req, res) {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: 'Invalid' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid' });
const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
}