import Joi from '@hapi/joi';
import Result from '../result';
import { Validator } from './types';

/**
 * Checks if the subject is not `null` or `undefined`.
 */
const Exists: Validator = function Exists() {
  return function validate(subject: any, label: string) {
    const schema = Joi.any()
      .exist()
      .not(null);
    const { error } = schema.label(label).validate(subject);

    if (typeof error !== 'undefined') {
      return Result.fail(error.message);
    }

    return Result.ok();
  };
};

export default Exists;
