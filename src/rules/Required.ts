import { RuleContract } from "../contracts/RuleContract";
import isNotEmpty from "../helpers/isNotEmpty";
import isNotNull from "../helpers/isNotNull";

export class Required implements RuleContract {
  validate(value: any, param?: any): boolean {
    return isNotNull(value) && isNotEmpty(value);
  }

  errorMessage(): string {
    return ":attribute is required";
  }
}
