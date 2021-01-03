import * as express from 'express';
import ClientRouter from './client';
const router = express.Router();

router.use('/clients', ClientRouter);

export default router;
