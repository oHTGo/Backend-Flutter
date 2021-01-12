import * as express from 'express';
import {UserController} from '../controllers/User';

const router = express.Router();

router.post('/login', UserController.login);

export default router;
