import * as express from 'express';
import {UserController} from '../controllers/User';

const router = express.Router();

router.post('/auth/login', UserController.login);

export default router;
