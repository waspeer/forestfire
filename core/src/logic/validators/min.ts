import Joi from '@hapi/joi';
import { Validator } from './types';
import Result from '../result';

type MinSubject = string | Array<any> | object;

/**
 * Checks if the subject has a specified minimum length.
 *
 * @param {number} length - The minimum length.
 */
const Min: Validator = function Min(length: number) {
  return function validateLength(subject: MinSubject, label: string) {
    let schema;
    if (typeof subject === 'string') schema = Joi.string().min(length);
    else if (Array.isArray(subject)) schema = Joi.array().min(length);
    else schema = Joi.object().min(length);

    const { error } = schema.label(label).validate(subject);

    if (typeof error !== 'undefined') {
      return Result.fail(error.message);
    }

    return Result.ok();
  };
};

export default Min;
