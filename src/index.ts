import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './routes';
import seeder from './helpers/seeder.helper';
import * as chalk from 'chalk';
import {errorHandler} from './helpers/errors.helper';
import * as envConfig from './config';

createConnection()
  .then(async () => {
    // create start up data
    await seeder();

    // create express app
    const app = express();
    app.use(bodyParser.json());
    // Add headers
    app.use((req, res, next) => {
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
    });

    // active api
    app.use(`/api/${envConfig.VERSION}`, api);
    // catch 404 and forward to error handler
    app.use(async (req, res, next) => {
      next({
        status: 'error',
        message: 'Unable to locate the requested resource'
      });
    });
    // error handler
    app.use(errorHandler);

    // start express server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(
        chalk.black(
          chalk.bgGreen(
            `Express server has started on ${chalk.underline.bold(
              `http://localhost:${port}`
            )}`
          )
        )
      );
    });
  })
  .catch((error) =>
    console.log(chalk.black.bgRed('Something wrong with connection'), error)
  );
