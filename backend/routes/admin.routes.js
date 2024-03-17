import express from 'express';
import { login, createAdmin } from '../controller/login.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/createAdmin', createAdmin);

export default router;
