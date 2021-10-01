export class RuleParser {
    protected customErrorMessages?: Record<string, string>;

    constructor(messages?: Record<string, string>) {
        this.customErrorMessages = messages || {};
    }

    /**
     * Parse incoming rules in to a array of rules
     * i.e. required|min:3 => ['required', 'min:3']
     * @param {string[]|string} rule
     * @returns {string[]}
     */
    public parseRule(rule: string[] | string): string[] {
        if (Array.isArray(rule)) {
            return rule; // Dont need to do anything here already in the correct format
        }

        return rule.split('|');
    }

    /**
     * Split a rule form it's parameters
     * Example:
     * required => ['required', undefined]
     * min:3 => ['min', 3]
     * 
     * @param {string} rule
     * @returns {[string, string|number|undefined]}
     */
    public parse(rule: string): [string, string | number | undefined] {
        const params = rule.split(":");

        if (params.length > 2) {
            throw console.error(`Rule: ${rule} has invalid rule systax`);
        }

        return [params[0], params[1] || undefined];
    }

    /**
     * Parse an error message and replace with parameters
     * 
     * @param {string} rule
     * @param {string} attribute
     * @param {any} value
     * @param {string} message
     * @param {any} param
     * @returns {string}
     */
    public parseErrorMessage(rule: string, attribute: string, value: any, message: string, param?: any): string {
        const attributeName = attribute.replace('_', ' ').replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

        let returnMessage = message;

        if (this.customErrorMessages !== undefined && this.customErrorMessages[`${attribute}.${rule}`]) {
            returnMessage = this.customErrorMessages[`${attribute}.${rule}`];
        }

        return returnMessage
            .replace(':attribute', attributeName)
            .replace(':value', value)
            .replace(':param', param || '');
    }
}