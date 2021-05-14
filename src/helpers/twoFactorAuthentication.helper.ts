import * as speakeasy from 'speakeasy';

export default class TwoFactorAuthentication {
  public static create(): string {
    const {base32} = speakeasy.generateSecret();
    return base32;
  }

  public static validate(secret: string, totp: string): boolean {
    try {
      const totpValidate = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: totp
      });
      return totpValidate;
    } catch (err) {
      return false;
    }
  }
}
