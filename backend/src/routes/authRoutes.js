import express from 'express';
import { login, register, googleAuthController, facebookAuthController } from '../controller/authController.js';
import passport from '../config/passport.js';

const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/auth-google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),googleAuthController);
authRouter.get('/auth-facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),facebookAuthController);

export default authRouter;