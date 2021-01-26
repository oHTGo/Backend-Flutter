import {BaseEntity} from 'typeorm';

export interface IResponseData {
  status: string;
  message: string;
  data?: Record<string, unknown> | BaseEntity[] | BaseEntity;
}
