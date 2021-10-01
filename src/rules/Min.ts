import { IRuleContract } from "../Contracts/RuleContract";
import isNumeric from "../helpers/isNumeric";

export class Min implements IRuleContract {
  validate(value: any, param?: any): boolean {

    if (isNumeric(value)) {
      // Is a string of a number like "2" or "1234"
      if (Number(value) < Number(param)) {
        return false;
      } else {
        return true;
      }
    }


    if (String(value).length < Number(param)) {
      return false;
    }

    return true;
  }

  errorMessage(): string {
    return ":attribute cannot be less than :param";
  }
}
