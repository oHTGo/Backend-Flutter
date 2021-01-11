import {Request, Response} from 'express';
import {User} from '../../entities/User.entity';
import {BadRequest, NotFound} from '../../helpers/errors.helper';
import asyncCatch from '../../helpers/asyncCatch.helper';
import Hasher from '../../helpers/bcrypt.helper';
import * as jwt from 'jsonwebtoken';
import * as envConfig from '../../config';
import sendSuccess from '../../helpers/success.helper';

export default asyncCatch(async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (!(username && password))
    throw new BadRequest('User or password is empty');

  const user: any = await User.findOne({username: username});
  if (!user) throw new NotFound('Username or password is incorrect');
  if (!Hasher.checkHash(password, user.password))
    throw new NotFound('Username or password is incorrect');

  const token = jwt.sign(
    {userId: user.id, username: user.username},
    envConfig.JWTSECRET,
    {expiresIn: '3d'}
  );
  sendSuccess(res, 'Logged in successfully', {accessToken: token});
});
