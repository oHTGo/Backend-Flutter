import {NextFunction, Request, Response} from 'express';
import asyncCatch from '../helpers/asyncCatch.helper';
import * as envConfig from '../config';
import * as jwt from 'jsonwebtoken';

export default asyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    const token: any = req.headers.authorization.split(' ')[1];
    console.log(token);
    const jwtPayload = jwt.verify(token, envConfig.JWTSECRET);
    if (jwtPayload) {
      req.currentUser = jwtPayload;
      console.log(req.currentUser);
      next();
    }
  }
);
