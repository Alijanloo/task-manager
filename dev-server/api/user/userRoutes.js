import express from 'express';
import index from './user-controller.js'
const router = express.Router();

router.get('/user', index)

export default router;