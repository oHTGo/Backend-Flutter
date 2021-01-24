export {};
declare global {
  namespace Express {
    interface Request {
      currentUser: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
  interface Error {
    name: string;
    message: string | string[];
    stack?: string;
  }
}
