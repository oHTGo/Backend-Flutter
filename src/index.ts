import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as bodyParser from 'body-parser';
import * as envConfig from './config';
import {InversifyExpressServer} from 'inversify-express-utils';
import {errorHandler, notFoundHandler} from './helpers/errors.helper';
import {setupContainer} from './helpers/container.helper';
import {setHeader} from './helpers/request.helper';
import {addSeeder} from './helpers/seeder.helper';

createConnection()
  .then(async () => {
    const container = await setupContainer();
    // create server
    const server = new InversifyExpressServer(container);
    // add seeder
    await addSeeder();
    server
      .setConfig((app) => {
        // add body parser
        app.use(
          bodyParser.urlencoded({
            extended: true
          })
        );
        app.use(bodyParser.json());
        app.use(setHeader);
      })
      .setErrorConfig((app) => {
        app.use(notFoundHandler);
        app.use(errorHandler);
      });

    const app = server.build();
    app.listen(envConfig.PORT);
  })
  .catch((err) => console.log(err));
