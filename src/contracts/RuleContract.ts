export interface RuleContract {
  validate(value: any, param?: any): boolean;

  errorMessage(): string;
}
