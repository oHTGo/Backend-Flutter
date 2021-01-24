import {injectable} from 'inversify';
import {BadRequest, NotFound} from '../helpers/errors.helper';
import {User} from '../entities/User.entity';
import * as jwt from 'jsonwebtoken';
import * as envConfig from '../config';
import Hasher from '../helpers/bcrypt.helper';
import {sendSuccess} from '../helpers/success.helper';
import {
  IResponseDataFull,
  IResponseDataShort
} from '../interfaces/Response.interface';

@injectable()
export class UserRepository {
  public async login(
    username: string,
    password: string
  ): Promise<IResponseDataFull | IResponseDataShort> {
    if (!(username && password))
      throw new BadRequest('User or password is empty');

    const user: User = await User.findOne({username: username});
    if (!user) throw new NotFound('Username or password is incorrect');
    if (!Hasher.checkHash(password, user.password))
      throw new NotFound('Username or password is incorrect');

    const token = jwt.sign(
      {userId: user.id, username: user.username},
      envConfig.JWTSECRET,
      {expiresIn: '3d'}
    );
    return sendSuccess('Logged in successfully', {accessToken: token});
  }
}
