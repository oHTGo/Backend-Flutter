import {Response} from 'express';

export default function sendSuccess(
  message: string,
  data?: Object,
  statusCode?: number
) {
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
