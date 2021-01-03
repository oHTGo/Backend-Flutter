import {Response} from 'express';

export default function sendSuccess(
  response: Response,
  message: string,
  data?: Object,
  statusCode?: number
) {
  return data
    ? response.status(statusCode || 200).json({
        status: 'success',
        message: message,
        data: data
      })
    : response.status(statusCode || 200).json({
        status: 'success',
        message: message
      });
}
