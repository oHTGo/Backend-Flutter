import {Request, Response} from 'express';
import {Client} from '../../entities/Client.entity';
import {User} from '../../entities/User.entity';
import {BadRequest, DefaultError, NotFound} from '../../helpers/errors.helper';
import asyncCatch from '../../helpers/asyncCatch.helper';
import sendSuccess from '../../helpers/success.helper';
import {validate} from 'class-validator';
import {errorParser} from '../../helpers/util.helper';

export default asyncCatch(async (req: Request, res: Response) => {
  const user: any = await User.findOne({username: req.body.createdBy});
  if (!user) throw new NotFound('User is not exist');

  const data = req.body;
  const client = new Client();
  client.fullName = data.fullName;
  client.description = data.description;
  client.phoneNumber = data.phoneNumber;
  client.avatarUrl = data.avatarUrl;
  client.createdBy = user;

  const validateErrors: any = await validate(client);
  if (validateErrors.length) throw new BadRequest(errorParser(validateErrors));

  await client.save();

  return sendSuccess(res, 'Client was created successfully', {
    statusCode: 201
  });
});
