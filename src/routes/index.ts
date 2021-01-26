import * as express from 'express';
import ClientRouter from './client';
import UserRouter from './user';
const router = express.Router();

router.use('/clients', ClientRouter);
router.use('/users', UserRouter);

export default router;
