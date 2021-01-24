export {};
declare global {
  namespace Express {
    interface Request {
      currentUser: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}
