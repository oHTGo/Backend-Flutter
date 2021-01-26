import {Container} from 'inversify';
import {TYPES} from '../constants/types';
import {ClientRepository} from '../repositories/client.repository';
import {UserRepository} from '../repositories/user.repository';

import '../controllers/user.controller';
import '../controllers/client.controller';
import {TokenCheckerMiddleware} from '../middlewares/tokenChecker.middleware';
import {Logger} from './logger.helper';
import {ILogger} from 'src/interfaces/Logger.interface';

const container = new Container();
const setupContainer = (): Container => {
  container.bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepository);
  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  container
    .bind<TokenCheckerMiddleware>(TYPES.TokenCheckerMiddleware)
    .to(TokenCheckerMiddleware);
  container.bind<ILogger>(TYPES.ILogger).to(Logger);
  return container;
};

const getContainer = (): Container => {
  return container;
};

export {setupContainer, getContainer};
