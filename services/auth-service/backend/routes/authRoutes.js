import express from 'express';
import { login,register } from '../controllers/authController.js';

const router = express.Router();

router.get('/status', (_, res) => res.send('Auth Service is running and changing'));
router.post('/login', login);
router.post('/register', register);

export default router;
