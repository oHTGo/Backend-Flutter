import {Request, Response, NextFunction} from 'express';
import {Client} from '../../entities/Client.entity';
import {User} from '../../entities/User.entity';
import {NotFound} from '../../helpers/errors.helper';
import sendSuccess from '../../helpers/success.helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = await User.findOne({username: req.currentUser.username});
  if (!user) return next(new NotFound('User is not exist'));

  const client: any = await Client.findOne({
    id: req.params.clientId,
    createdBy: user.id
  });
  if (!client) return next(new NotFound('Client is not found'));

  return sendSuccess(res, 'Client was gotten successfully', client);
};
