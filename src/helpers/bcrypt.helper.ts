import * as bcrypt from 'bcrypt';

export default class Hasher {
  public static async hash(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  }

  public static checkHash(unencryptedString: string, hash: string) {
    return bcrypt.compareSync(unencryptedString, hash);
  }
}
