const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  ClientRepository: Symbol.for('ClientRepository'),
  TokenCheckerMiddleware: Symbol.for('TokenCheckerMiddleware'),
  TokenGoogleCheckerMiddleware: Symbol.for('TokenGoogleCheckerMiddleware'),
  ILogger: Symbol.for('ILogger')
};

export {TYPES};
