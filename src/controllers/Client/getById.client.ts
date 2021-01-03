import {Request, Response} from 'express';
import {Client} from '../../entities/Client.entity';
import {User} from '../../entities/User.entity';
import {NotFound} from '../../helpers/errors.helper';
import asyncCatch from '../../helpers/asyncCatch.helper';
import sendSuccess from '../../helpers/success.helper';

export default asyncCatch(async (req: Request, res: Response) => {
  const user: any = await User.findOne({username: req.body.createdBy});
  if (!user) throw new NotFound('User is not exist');

  const client: any = await Client.findOne({
    id: req.params.clientId,
    createdBy: user.id
  });
  if (!client) throw new NotFound('Client is not found');

  return sendSuccess(res, 'Client was gotten successfully', client);
});
