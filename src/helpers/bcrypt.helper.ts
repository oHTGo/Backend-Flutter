import * as bcrypt from 'bcrypt';

export default class Hasher {
  public static async hash(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  }
}
