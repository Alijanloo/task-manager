import express from 'express';
const router = express.Router();
import index from './auth-controller.js'

router.post('/auth', index)

export default router;