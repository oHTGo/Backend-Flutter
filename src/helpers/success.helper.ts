import {Client} from './../entities/Client.entity';
import {
  IResponseDataFull,
  IResponseDataShort
} from '../interfaces/Response.interface';

const sendSuccess = (
  message: string,
  data?: Record<string, unknown> | Client | Client[] // eslint-disable-line @typescript-eslint/no-unused-vars
): IResponseDataShort | IResponseDataFull => {
  const _data = data
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
};

export {sendSuccess};
