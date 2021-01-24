import {BaseEntity} from 'typeorm';

export interface IResponseDataFull {
  status: string;
  message: string;
  data: Record<string, unknown> | BaseEntity[] | BaseEntity;
}

export interface IResponseDataShort {
  status: string;
  message: string;
}
