/* eslint no-shadow: ["error", { "allow": ["result"] }] */
import Result from './result';
import { ErrorOr } from './domain-error';
import { ValidatorFunction } from './validators/types';
import Exists from './validators/exists';
import HasLength from './validators/has-length';
import IsEmail from './validators/is-email';
import Min from './validators/min';

/**
 * The subjects that need to be checked
 */
interface Subjects {
  [key: string]: any;
}

/**
 * A data validation function.
 *
 * The available validators are set as properties on the function itself.
 *
 * @param {object.<string,any>} subjects - The subjects that are validated.
 * @param {ValidatorFunction[]} validators - An array of validators.
 * @returns {Result}
 */
function Check(
  subjects: Subjects,
  validators: ValidatorFunction[]
): ErrorOr<any> {
  return Object.keys(subjects).reduce((result, subjectName) => {
    if (result.isFailure()) {
      return result;
    }

    return validators.reduce((result, validator) => {
      if (result.isFailure()) {
        return result;
      }

      return validator(subjects[subjectName], subjectName);
    }, Result.ok());
  }, Result.ok());
}

Check.exists = Exists;
Check.hasLength = HasLength;
Check.isEmail = IsEmail;
Check.min = Min;

export default Check;
