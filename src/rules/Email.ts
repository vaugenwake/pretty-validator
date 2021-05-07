import { RuleContract } from "../contracts/RuleContract";

export class Email implements RuleContract {
  validate(value: any, param?: any): boolean {
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
