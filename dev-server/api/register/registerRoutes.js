import express from 'express';
const router = express.Router();
import index from './register-controller.js'

router.post('/register', index);

export default router;