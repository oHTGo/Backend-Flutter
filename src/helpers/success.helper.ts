import {BaseEntity} from 'typeorm';
import {IResponseData} from '../interfaces/Response.interface';

export default function sendSuccess(
  message: string,
  data?: Record<string, unknown> | BaseEntity[] | BaseEntity // eslint-disable-line @typescript-eslint/no-unused-vars
): IResponseData {
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
}

export {sendSuccess};
