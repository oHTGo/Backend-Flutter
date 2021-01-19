import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';
import * as envConfig from './config';
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';
import {TYPES} from './constants/types';
import {errorHandler} from './helpers/errors.helper';
import {ClientRepository} from './repositories/client.repository';
import {UserRepository} from './repositories/user.repository';

//import controller
import './controllers/user.controller';
import './controllers/client.controller';
import {TokenCheckerMiddleware} from './middlewares/tokenChecker.middleware';

createConnection()
  .then(async () => {
    // set up container
    let container = new Container();
    container
      .bind<ClientRepository>(TYPES.ClientRepository)
      .to(ClientRepository);
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
    container
      .bind<TokenCheckerMiddleware>(TYPES.TokenCheckerMiddleware)
      .to(TokenCheckerMiddleware);
    // create server
    let server = new InversifyExpressServer(container);
    server
      .setConfig((app) => {
        // add body parser
        app.use(
          bodyParser.urlencoded({
            extended: true
          })
        );
        app.use(bodyParser.json());
        // Add headers
        app.use((req: Request, res: Response, next: NextFunction) => {
          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', envConfig.CLIENT_URL);
          // Request methods you wish to allow
          res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE'
          );
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
        });
      })
      .setErrorConfig((app) => {
        app.use(async (req, res, next) => {
          next({
            status: 404,
            message: 'Unable to locate the requested resource'
          });
        });
        app.use(errorHandler);
      });

    let app = server.build();
    app.listen(envConfig.PORT);
  })
  .catch((err) => console.log(err));
