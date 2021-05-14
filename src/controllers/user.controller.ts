import {inject} from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  requestBody,
  httpGet,
  queryParam,
  request, // eslint-disable-line @typescript-eslint/no-unused-vars
  response // eslint-disable-line @typescript-eslint/no-unused-vars
} from 'inversify-express-utils';
import {UserRepository} from '../repositories/user.repository';
import {TYPES} from '../constants/types';
import {IResponseData} from '../interfaces/Response.interface';
import {Response} from 'express';
import {Request} from 'express';

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
    const totp: string = body.totp;
    return this.userRepository.login(username, password, totp);
  }

  @httpGet('/authorize')
  public async authorize(
    @response() response: Response,
    @queryParam('client_id') clientId: string,
    @queryParam('redirect_uri') redirectUri: string,
    @queryParam('code_challenge') codeChallenge: string
  ): Promise<void> {
    this.userRepository.authorize(
      response,
      clientId,
      redirectUri,
      codeChallenge
    );
  }

  @httpPost('/token')
  public async getToken(
    @requestBody() body: Record<string, string>
  ): Promise<IResponseData> {
    return this.userRepository.getToken(
      body.client_id,
      body.redirect_uri,
      body.code,
      body.code_verifier
    );
  }

  @httpGet('/profile', TYPES.TokenCheckerMiddleware)
  public async get(@request() request: Request): Promise<IResponseData> {
    return this.userRepository.getProfile(request.currentUser);
  }

  @httpPost('/profile', TYPES.TokenCheckerMiddleware)
  public async refresh(@request() request: Request): Promise<IResponseData> {
    return this.userRepository.updateProfile(
      request.currentUser,
      request.body.fullName,
      request.body.is2FactorEnabled
    );
  }
}
