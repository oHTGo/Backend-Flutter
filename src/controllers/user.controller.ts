import {inject} from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  requestBody
} from 'inversify-express-utils';
import {UserRepository} from '../repositories/user.repository';
import {TYPES} from '../constants/types';
import {IResponseData} from '../interfaces/Response.interface';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {
    super();
  }

  @httpPost('/auth/login')
  public async login(
    @requestBody() body: Record<string, string>
  ): Promise<IResponseData> {
    const username: string = body.username;
    const password: string = body.password;
    return this.userRepository.login(username, password);
  }
}
