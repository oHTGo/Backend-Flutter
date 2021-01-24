export interface IResponseDataFull {
  status: string;
  message: string;
  data: Record<string, unknown>;
}

export interface IResponseDataShort {
  status: string;
  message: string;
}
