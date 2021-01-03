import * as express from 'express';
import {ClientController} from '../controllers/Client';

const router = express.Router();

router.get('/', ClientController.getAll);
router.get('/:clientId', ClientController.getById);
router.post('/', ClientController.create);
router.put('/:clientId', ClientController.updateById);
router.delete('/:clientId', ClientController.deleteById);

export default router;
