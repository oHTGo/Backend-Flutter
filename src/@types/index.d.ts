import {ICurrentUser} from '../interfaces/User.interface';

export {};
declare global {
  namespace Express {
    interface Request {
      currentUser: ICurrentUser; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}
