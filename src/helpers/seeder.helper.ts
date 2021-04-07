import {User} from '../entities/User.entity';
import Hasher from '../helpers/bcrypt.helper';
import 'reflect-metadata';
import {getContainer} from './container.helper';
import {ILogger} from '../interfaces/Logger.interface';
import {TYPES} from '../constants/types';
import {injectable} from 'inversify';

@injectable()
export class Seeder {
  private logger = getContainer().get<ILogger>(TYPES.ILogger);
  public async add(): Promise<void> {
    const user = await User.findOne({username: 'admin'});
    if (!user) {
      const pw = await Hasher.hash('password');
      await User.create({
        username: 'admin',
        password: pw,
        fullName: 'F-Code'
      }).save();
      this.logger.success('Create Admin User successfully!');
    } else this.logger.warning('Admin User is already exist!');
  }
}
