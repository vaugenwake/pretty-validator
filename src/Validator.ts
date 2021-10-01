import { IRuleContract } from "./Contracts/RuleContract";
import isEmpty from "./helpers/isEmpty";
import { MessageBag } from "./MessageBag";
import { RuleParser } from "./RuleParser";
import { Email } from "./rules/Email";
import { Min } from "./rules/Min";
import { Required } from "./rules/Required";

export class Validator<TValidator extends Record<string, unknown>>
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
        this.setRules(this.formRules);
        this.messages.empty();

        this.formRules = new Map(this.parseRules(this.intialRules));

        if (this.fails()) {
            return false;
        }

        return true;
    }

    /**
     * Register the rules for the validator
     * @param rules Map<string, string[]>
     * @returns Validator
     */
    public setRules(rules: Map<string, string[]>): Validator<TValidator> {
        this.formRules = rules;
        return this;
    }

    /**
     * Return all data stored in validator
     * @returns TValidator
     */
    public all(): TValidator {
        return this.formData;
    }

    /**
     * @param {string} attr
     * @returns any
     */
    public getValue(attr: string): any {
        return this.formData[attr];
    }

    /**
     * Return instance of message bag
     * @returns MessageBag
     */
    public errors(): MessageBag {
        return this.messages;
    }

    /**
     * Loop over all rules and validate the form parameters that match
     * If any value is not valid add it to the message bag and fail.
     * @returns {boolean}
     */
    public passes(): boolean {
        this.formRules.forEach((attributeRules: string[], attribute: string) => {
            attributeRules.forEach((rule) => {
                this.validateAttributeWithRule(attribute, rule);
            })
        });

        return !this.messages.any();
    }

    /**
     * Kick off validation
     * @returns {boolean}
     */
    public fails(): boolean {
        this.cleanDataset();
        return !this.passes();
    }

    /**
     * Clean and parse rules into expected format
     * @param rules: Map<string, string[]|string>
     * @returns Map<string, string[]>
     */
    private parseRules(rules: Map<string, string[] | string>): Map<string, string[]> {
        const cleanedRules = new Map<string, string[]>();

        rules.forEach((value: string | string[], key: string) => {
            cleanedRules.set(key, this.ruleParser.parseRule(value));
        });

        return cleanedRules;
    }

    /**
     * Clean dataset, remove any attributes and rules that
     * are not required and don't have a value set
     * @retuns {void}
     */
    private cleanDataset(): void {
        this.formRules.forEach((attributeRules: string[], attribute: string) => {
            // If the attribute is not required && is empty, remove it from validation.
            if (!attributeRules.includes('required') && isEmpty(this.getValue(attribute))) {
                this.formRules.delete(attribute);
            }
        })
    }

    /** 
     * Find the relevant rule, parse the input and perform validation
     * If validation fails add to message bag
     * @param {string} attribute
     * @param {string} rule
     * @returns {void}
    */
    private validateAttributeWithRule(attribute: string, rule: string): void {
        if (rule === '') {
            return;
        }

        const value = this.getValue(attribute);
        const [validatorRule, param] = this.ruleParser.parse(rule);

        if (!this.validationRules[validatorRule].validate(value, param)) {
            this.messages.add(attribute, this.ruleParser.parseErrorMessage(
                validatorRule,
                attribute,
                value,
                this.validationRules[validatorRule].errorMessage(),
                param
            ));
        }
    }
}