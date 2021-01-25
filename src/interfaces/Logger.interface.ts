export interface ILogger {
  error(err: string): void;
  info(infor: string): void;
  warning(warn: string): void;
  success(succ: string): void;
}
