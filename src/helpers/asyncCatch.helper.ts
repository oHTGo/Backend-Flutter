import {Request, Response, NextFunction} from 'express';
const asyncCatch = (fn) => {
  return (req: Request, res: Response, next: NextFunction): Promise<Response> =>
    fn(req, res, next).catch(next);
};

export default asyncCatch;
