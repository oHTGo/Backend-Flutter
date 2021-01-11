import * as express from 'express';
import ClientRouter from './client';
import AuthRouter from './auth';
const router = express.Router();

router.use('/clients', ClientRouter);
router.use('/auth', AuthRouter);

export default router;
