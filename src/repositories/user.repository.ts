import {injectable} from 'inversify';
import {BadRequest, NotFound} from '../helpers/errors.helper';
import {User} from '../entities/User.entity';
import * as jwt from 'jsonwebtoken';
import * as envConfig from '../config';
import Hasher from '../helpers/bcrypt.helper';
import {sendSuccess} from '../helpers/success.helper';
import {IResponseData} from '../interfaces/Response.interface';
import {Response} from 'express';
import axios from 'axios';
import * as querystring from 'querystring';

@injectable()
export class UserRepository {
  public async login(
    username: string,
    password: string
  ): Promise<IResponseData> {
    if (!(username && password))
      throw new BadRequest('User or password is empty');

    const user: User = await User.findOne({username: username});

    if (!user) throw new NotFound('Username or password is incorrect');
    if (!Hasher.checkHash(password, user.password))
      throw new NotFound('Username or password is incorrect');

    const token = jwt.sign(
      {userId: user.id, username: user.username, iss: 'local'},
      envConfig.JWTSECRET,
      {expiresIn: '3d'}
    );
    return sendSuccess('Logged in successfully', {accessToken: token});
  }

  public async authorize(
    response: Response,
    clientId: string,
    redirectUri: string,
    codeChallenge: string
  ): Promise<void> {
    const queryRequest = querystring.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';

    response.redirect(`${url}?${queryRequest}`);
  }

  public async getToken(
    clientId: string,
    redirectUri: string,
    code: string,
    codeVerifier: string
  ): Promise<IResponseData> {
    const queryRequest = querystring.stringify({
      code: code,
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: envConfig.CLIENT_SECRET,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code'
    });
    const url = `https://oauth2.googleapis.com/token`;
    const res = await axios.post(url, queryRequest);
    if (!res) throw new BadRequest('Request is invalid');
    return sendSuccess('Get token successfully', {
      accessToken: res.data.id_token
    });
  }

  public async validateUserByEmail(email: string): Promise<User> {
    const user = User.findOne({email: email});
    return user;
  }

  public async validateUserByUsername(username: string): Promise<User> {
    const user = User.findOne({username: username});
    return user;
  }
}
