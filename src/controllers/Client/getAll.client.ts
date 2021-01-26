import {Request, Response} from 'express';
import {Client} from '../../entities/Client.entity';
import {User} from '../../entities/User.entity';
import {NotFound, DefaultError} from '../../helpers/errors.helper';
import asyncCatch from '../../helpers/asyncCatch.helper';
import sendSuccess from '../../helpers/success.helper';

export default asyncCatch(async (req: Request, res: Response) => {
  const user: any = await User.findOne({username: req.currentUser.username});
  if (!user) throw new NotFound('User is not exist');

  const clients: Client[] = await Client.find({createdBy: user});
  if (!clients) throw new DefaultError('Database connection error');

  return sendSuccess(res, 'Clients were gotten successfully', clients);
});
