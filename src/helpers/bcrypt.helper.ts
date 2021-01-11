import * as bcrypt from 'bcryptjs';
import * as envConfig from '../config';

export default class Hasher {
  public static async hash(password: string) {
    return await bcrypt.hash(password, parseInt(envConfig.SALT));
  }

  public static checkHash(unencryptedString: string, hash: string) {
    return bcrypt.compareSync(unencryptedString, hash);
  }
}
