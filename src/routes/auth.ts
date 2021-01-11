import * as express from 'express';
import {Middleware} from '../middleware';
import {AuthController} from '../controllers/Auth';

const router = express.Router();

router.post('/', AuthController.login);
router.get('/', Middleware.checkToken, (req, res) => {
  res.send('OK');
});

export default router;
