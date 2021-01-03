import {User} from '../entities/User.entity';
import Hasher from '../helpers/bcrypt.helper';
import * as chalk from 'chalk';

export default async () => {
  const user = await User.findOne({username: 'admin'});
  if (!user) {
    const pw = await Hasher.hash('password');
    await User.create({
      username: 'admin',
      password: pw,
      fullName: 'F-Code'
    }).save();
    console.log(chalk.black(chalk.bgBlue('Create Admin User successfully!')));
  } else console.log(chalk.black(chalk.bgBlue('Admin User is already exist!')));
};
