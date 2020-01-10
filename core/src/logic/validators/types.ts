import { ErrorOr } from '../domain-error';

/**
 * A function that validates the subject on a specific constraint.
 *
 * @callback ValidatorFunction
 * @param {any} subject - The subject that is to be validated.
 * @param {string} label - The label that is used in the message when validation has failed
 * @returns {Result}
 */
export interface ValidatorFunction {
  (subject: any, label: string): ErrorOr<any>;
}

/**
 * A higher-order function that creates a ValidatorFunction
 * @param {...any} options - The options that are used when the validator is created.
 */
export interface Validator {
  (...options: any[]): ValidatorFunction;
}
