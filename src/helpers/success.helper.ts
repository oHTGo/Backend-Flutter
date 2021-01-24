import {BaseEntity} from 'typeorm';
import {
  IResponseDataFull,
  IResponseDataShort
} from '../interfaces/Response.interface';

export default function sendSuccess(
  message: string,
  data?: Record<string, unknown> | BaseEntity[] | BaseEntity,
  statusCode?: number // eslint-disable-line @typescript-eslint/no-unused-vars
): IResponseDataFull | IResponseDataShort {
  return data
    ? {
        status: 'success',
        message: message,
        data: data
      }
    : {
        status: 'success',
        message: message
      };

  return _data;
}

export {sendSuccess};
