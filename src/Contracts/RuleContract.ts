export interface IRuleContract {
  validate(value: string | number | undefined | unknown, param?: any): boolean;
  errorMessage(): string;
}
