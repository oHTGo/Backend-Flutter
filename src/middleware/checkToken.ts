import {NextFunction, Request, Response} from 'express';
import asyncCatch from '../helpers/asyncCatch.helper';
import * as envConfig from '../config';
import * as jwt from 'jsonwebtoken';
import {Forbidden, Unauthorized} from '../helpers/errors.helper';

export default asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: any = req.headers.authorization.split(' ')[1];
      const jwtPayload = jwt.verify(token, envConfig.JWTSECRET);
      req.currentUser = jwtPayload;
      next();
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        throw new Unauthorized('Token is expired');
      } else {
        throw new Forbidden('Access is not valid');
      }
    }
  }
);
