import {NextFunction, Request, Response} from 'express';

class DefaultError extends Error {
  public statusCode: number;
  constructor(message: string, externalStatusCode?: number) {
    super();
    if (arguments.length === 2) this.statusCode = externalStatusCode;
    this.message = message;
  }
  getCode() {
    if (this.statusCode) return this.statusCode;
    if (this instanceof BadRequest) return STATUS_CODE.BAD_REQUEST;
    if (this instanceof Unauthorized) return STATUS_CODE.UNAUTHORIZED;
    if (this instanceof Forbidden) return STATUS_CODE.FORBIDDEN;
    if (this instanceof NotFound) return STATUS_CODE.NOT_FOUND;
    return STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}

class BadRequest extends DefaultError {}
class Unauthorized extends DefaultError {}
class Forbidden extends DefaultError {}
class NotFound extends DefaultError {}

const STATUS_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOW: 405,
  INTERNAL_SERVER_ERROR: 500
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DefaultError) {
    return res.status(err.getCode()).json({
      status: 'fail',
      message: err.message
    });
  }

  //console.log(err);

  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went wrong'
  });
};

export {
  DefaultError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  STATUS_CODE,
  errorHandler
};
