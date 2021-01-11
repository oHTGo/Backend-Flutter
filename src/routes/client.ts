import * as express from 'express';
import {ClientController} from '../controllers/Client';
import {Middleware} from '../middleware';

const router = express.Router();

router.get('/', Middleware.checkToken, ClientController.getAll);
router.get('/:clientId', Middleware.checkToken, ClientController.getById);
router.post('/', Middleware.checkToken, ClientController.create);
router.put('/:clientId', Middleware.checkToken, ClientController.updateById);
router.delete('/:clientId', Middleware.checkToken, ClientController.deleteById);

export default router;
