import Joi from '@hapi/joi';
import { Validator } from './types';
import Result from '../result';

type HasLengthSubject = string | Array<any> | object;

/**
 * Checks if the subject has a specific length.
 *
 * @param {number} length - The length that is checked.
 */
const HasLength: Validator = function HasLength(length: number) {
  return function validateLength(subject: HasLengthSubject, label: string) {
    let schema;
    if (typeof subject === 'string') schema = Joi.string().length(length);
    else if (Array.isArray(subject)) schema = Joi.array().length(length);
    else schema = Joi.object().length(length);

    const { error } = schema.label(label).validate(subject);

    if (typeof error !== 'undefined') {
      return Result.fail(error.message);
    }

    return Result.ok();
  };
};

export default HasLength;
