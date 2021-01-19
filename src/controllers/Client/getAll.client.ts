import {Request, Response, NextFunction} from 'express';
import {Client} from '../../entities/Client.entity';
import {User} from '../../entities/User.entity';
import {NotFound, DefaultError} from '../../helpers/errors.helper';
import sendSuccess from '../../helpers/success.helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = await User.findOne({username: req.currentUser.username});
  if (!user) return next(new NotFound('User is not exist'));

  const clients: any = await Client.find({createdBy: user.id});
  if (!clients) return next(new DefaultError('Database connection error'));

  return sendSuccess(res, 'Clients were gotten successfully', clients);
};
