import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseMiddleware} from 'inversify-express-utils';
import * as envConfig from '../config';
import * as jwt from 'jsonwebtoken';
import {Forbidden} from '../helpers/errors.helper';
import {ICurrentUser} from '../interfaces/User.interface';
import {OAuth2Client} from 'google-auth-library';
import {TYPES} from '../constants/types';
import {UserRepository} from '../repositories/user.repository';

@injectable()
export class TokenCheckerMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {
    super();
  }

  public async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const [tokenType, token] = req.headers.authorization.split(' ');
      if (tokenType !== 'Bearer' && !token)
        throw new Forbidden('Invalid token type');

      const localToken = await this.checkLocalToken(token);
      const googleToken = await this.checkGoogleToken(token);
      if (!localToken && !googleToken)
        throw new Forbidden('Token is expired or invalid');

      localToken
        ? (this.httpContext.request.currentUser = localToken)
        : (this.httpContext.request.currentUser = googleToken);

      next();
    } catch (error) {
      next(error);
    }
  }

  private async checkLocalToken(token: string): Promise<ICurrentUser> {
    let payload: ICurrentUser;
    try {
      jwt.verify(token, envConfig.JWTSECRET, (err, decoded) => {
        if (err) return null;
        else payload = <ICurrentUser>decoded;
      });
    } catch (error) {
      return null;
    }
    return payload;
  }

  private async checkGoogleToken(token: string): Promise<ICurrentUser> {
    try {
      const client = new OAuth2Client(envConfig.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: envConfig.CLIENT_ID
      });
      if (!ticket) return null;
      const {email, iss, exp, iat} = ticket.getPayload();

      const user = await this.userRepository.validateUserByEmail(email);
      if (!user) return null;

      return {
        userId: user.id,
        username: user.username,
        iat,
        exp,
        iss
      };
    } catch (error) {
      return null;
    }
  }
}
