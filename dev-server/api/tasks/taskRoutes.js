import express from 'express';
const router = express.Router();
import taskController from './task-controller.js'
import * as auth from '../../services/auth-service'

router.get('/task', auth.requireLogin, taskController.index);
router.get('/task/:id', auth.requireLogin, taskController.show);
router.post('/task', auth.requireLogin, taskController.create);
router.put('/task', auth.requireLogin, taskController.update);
router.delete('/task/:id', auth.requireLogin, taskController.delete);

export default router;