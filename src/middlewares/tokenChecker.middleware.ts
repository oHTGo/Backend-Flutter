import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseMiddleware, interfaces} from 'inversify-express-utils';
import * as envConfig from '../config';
import * as jwt from 'jsonwebtoken';
import {Forbidden, Unauthorized} from '../helpers/errors.helper';

@injectable()
export class TokenCheckerMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers.authorization.split(' ')[1];
      const jwtPayload = jwt.verify(token, envConfig.JWTSECRET);
      this.httpContext.request.currentUser = jwtPayload;
      next();
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        next(new Unauthorized('Token is expired'));
      } else {
        next(new Forbidden('Access is not valid'));
      }
    }
  }
}
