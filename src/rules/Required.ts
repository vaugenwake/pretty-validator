import { IRuleContract } from "../Contracts/RuleContract";
import isEmpty from "../helpers/isEmpty";
import isNotEmpty from "../helpers/isNotEmpty";
import isNotNull from "../helpers/isNotNull";

export class Required implements IRuleContract {
  validate(value: string | number | undefined | unknown, param?: any): boolean {
    return !isEmpty(value) && isNotNull(value) && isNotEmpty(value);
  }

  errorMessage(): string {
    return ":attribute is required";
  }
}
