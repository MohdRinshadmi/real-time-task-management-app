import express from 'express';
import { login, register, googleAuthController } from '../controller/authController.js';
import passport from '../config/passport.js';

const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/auth-google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback route
authRouter.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	googleAuthController
);

export default authRouter;