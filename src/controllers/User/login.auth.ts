import {Request, Response, NextFunction} from 'express';
import {User} from '../../entities/User.entity';
import {BadRequest, NotFound} from '../../helpers/errors.helper';
import Hasher from '../../helpers/bcrypt.helper';
import * as jwt from 'jsonwebtoken';
import * as envConfig from '../../config';
import sendSuccess from '../../helpers/success.helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (!(username && password))
    return next(new BadRequest('User or password is empty'));

  const user: any = await User.findOne({username: username});
  if (!user) return next(new NotFound('Username or password is incorrect'));
  if (!Hasher.checkHash(password, user.password))
    return next(new NotFound('Username or password is incorrect'));

  const token = jwt.sign(
    {userId: user.id, username: user.username},
    envConfig.JWTSECRET,
    {expiresIn: '3d'}
  );

  return sendSuccess(res, 'Logged in successfully', {accessToken: token});
};
