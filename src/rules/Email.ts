import { IRuleContract } from "../Contracts/RuleContract";

export class Email implements IRuleContract {
  validate(value: string | number | undefined | unknown, param?: any): boolean {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (pattern.test(String(value).toLowerCase())) {
      return true;
    }

    return false;
  }

  errorMessage(): string {
    return ":value is not a valid email-address";
  }
}
