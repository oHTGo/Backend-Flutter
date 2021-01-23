import {Container} from 'inversify';
import {TYPES} from '../constants/types';
import {ClientRepository} from '../repositories/client.repository';
import {UserRepository} from '../repositories/user.repository';

import '../controllers/user.controller';
import '../controllers/client.controller';
import {TokenCheckerMiddleware} from '../middlewares/tokenChecker.middleware';

const setupContainer = (): Container => {
  const container = new Container();
  container.bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepository);
  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  container
    .bind<TokenCheckerMiddleware>(TYPES.TokenCheckerMiddleware)
    .to(TokenCheckerMiddleware);
  return container;
};

export {setupContainer};
