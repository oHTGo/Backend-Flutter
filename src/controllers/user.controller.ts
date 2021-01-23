import {inject} from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  requestBody
} from 'inversify-express-utils';
import {UserRepository} from '../repositories/user.repository';
import {TYPES} from '../constants/types';
import * as envConfig from '../config';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {
    super();
  }

  @httpPost('/auth/login')
  public async login(@requestBody() body: any) {
    const username = body.username;
    const password = body.password;
    return this.userRepository.login(username, password);
  }
}
