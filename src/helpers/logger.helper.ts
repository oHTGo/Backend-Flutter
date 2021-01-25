import * as chalk from 'chalk';
import {injectable} from 'inversify';
import {ILogger} from 'src/interfaces/Logger.interface';
import 'reflect-metadata';

@injectable()
export class Logger implements ILogger {
  public error(err: string): void {
    console.log(chalk.black(chalk.bgRed(err)));
  }
  public info(infor: string): void {
    console.log(chalk.black(chalk.bgBlue(infor)));
  }
  public warning(warn: string): void {
    console.log(chalk.black(chalk.bgYellow(warn)));
  }
  public success(succ: string): void {
    console.log(chalk.black(chalk.bgGreen(succ)));
  }
}
