import {injectable, inject} from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  requestBody
} from 'inversify-express-utils';
import {UserRepository} from '../repositories/user.repository';
import {TYPES} from '../constants/types';
import {NextFunction, Response} from 'express';
import {DefaultError, NotFound} from '../helpers/errors.helper';

@controller('/user')
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {
    super();
  }

  @httpPost('/')
  public async login(@requestBody() body: any) {
    const username = body.username;
    const password = body.password;
    return this.userRepository.login(username, password);
  }
}
