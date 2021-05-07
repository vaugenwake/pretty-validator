/**
 * Helper class to aid in common parsing tasks for rules
 * and message for validation.
 */
export class Parser {
  protected customErrorMessages?: Record<string, string>;

  constructor(customMessages?: Record<string, string>) {
    this.customErrorMessages = customMessages;
  }

  /**
   * Parses validation runners into a string array
   * @param rule string | string[]
   * @returns string[]
   */
  runner(rule: string | string[]): string[] {
    if (Array.isArray(rule)) {
      return rule;
    }

    return String(rule).split("|");
  }

  /**
   * Parse a rule and return the runner and parameters.
   * @param rule string
   * @returns [string, string|undefined]
   */
  rule(rule: string): [string, string | undefined] {
    const params = rule.split(":");

    if (params.length > 2) {
      throw console.error(
        `Rule: ${rule} expects atleast 1 parameter to be provided, zero given`
      );
    }

    return [params[0], params[1] || undefined];
  }

  /**
   * Return a parsed error message based on the error message syntax and
   * values provided at validation time.
   * @param rule string
   * @param attribute string
   * @param value any
   * @param message string
   * @param param any
   * @returns string
   */
  message(
    rule: string,
    attribute: string,
    value: any,
    message: string,
    param?: any
  ): string {
    const attributeName = attribute
      .replace("_", " ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    let returnMessage = message;

    if (
      this.customErrorMessages !== undefined &&
      this.customErrorMessages[`${attribute}.${rule}`]
    ) {
      returnMessage = this.customErrorMessages[`${attribute}.${rule}`];
    }

    return returnMessage
      .replace(":attribute", attributeName)
      .replace(":value", value)
      .replace(":param", param);
  }
}
