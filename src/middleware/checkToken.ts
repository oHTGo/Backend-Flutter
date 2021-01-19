import {Request, Response, NextFunction} from 'express';
import * as envConfig from '../config';
import * as jwt from 'jsonwebtoken';
import {Forbidden, Unauthorized} from '../helpers/errors.helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization.split(' ')[1];
    const jwtPayload = jwt.verify(token, envConfig.JWTSECRET);
    req.currentUser = jwtPayload;
    return next();
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      return next(new Unauthorized('Token is expired'));
    } else {
      return next(new Forbidden('Access is not valid'));
    }
  }
};
