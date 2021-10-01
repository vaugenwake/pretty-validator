export class RuleParser {
    protected customErrorMessages?: Record<string, string>;

    constructor(messages?: Record<string, string>) {
        this.customErrorMessages = messages || {};
    }
}