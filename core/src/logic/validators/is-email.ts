import Joi from '@hapi/joi';
import { Validator } from './types';
import Result from '../result';

/**
 * Checks if the subject is a valid email-address
 */
const IsEmail: Validator = () => {
  return function validateEmail(subject: string, label: string) {
    const schema = Joi.string().email();
    const { error } = schema.label(label).validate(subject);

    if (typeof error !== 'undefined') {
      return Result.fail(error.message);
    }

    return Result.ok();
  };
};

export default IsEmail;
