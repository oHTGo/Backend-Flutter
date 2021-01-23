import {Request, Response, NextFunction} from 'express';
import * as envConfig from '../config';

const setHeader = (req: Request, res: Response, next: NextFunction) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', envConfig.CLIENT_URL);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  // Pass to next layer of middleware
  next();
};

export {setHeader};
