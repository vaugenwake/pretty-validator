import { IRuleContract } from "./Contracts/RuleContract";
import { MessageBag } from "./MessageBag";
import { RuleParser } from "./RuleParser";
import { Email } from "./rules/Email";
import { Min } from "./rules/Min";
import { Required } from "./rules/Required";

export class Validator<TValidator = Record<string, unknown>>
{
    // Properties
    private formData!: TValidator;

    private intialRules!: Map<string, string[] | string>;

    private formRules!: Map<string, string[]>;

    private messages!: MessageBag;

    private ruleParser!: RuleParser;

    private customValidationMessages?: Record<string, string>;

    /**
     * Register validation rules.
     * This will act as a container for all validation rules that are included
     */
    private validationRules: Record<string, IRuleContract> = {
        required: new Required(),
        email: new Email(),
        min: new Min()
    };

    constructor(rules: Record<string, string[] | string>, customMessages?: Record<string, string>) {
        this.intialRules = new Map(Object.entries(rules));
        this.messages = new MessageBag();
        this.customValidationMessages = customMessages;
        this.ruleParser = new RuleParser(this.customValidationMessages);
    }

    /**
     * Set the data object to be validated.
     * @param data TValidator
     * @returns Validator
     */
    public setData(data: TValidator): Validator<TValidator> {
        this.formData = data;
        return this;
    }

    /**
     * Validate provided data against rules
     * @returns boolean
     */
    public validate(): boolean {
        return true;
    }

    /**
     * Return all data stored in validator
     * @returns TValidator
     */
    public all(): TValidator {
        return this.formData;
    }
}