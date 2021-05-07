import { RuleContract } from "../contracts/RuleContract";

export class Min implements RuleContract {
  validate(value: any, param?: any): boolean {
    /**
     * String = validate number of character
     * Number = validate value of nunber
     */
    if (typeof value == "string" || value instanceof String) {
      return String(value).length > Number(param);
    } else if (typeof value == "number" || value instanceof Number) {
      return Number(value) > Number(param);
    }

    return false;
  }

  errorMessage(): string {
    return ":attribute cannot be less than :param";
  }
}
