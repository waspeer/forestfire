import { DomainError } from '@forestfire/core';
import { UserEmailErrors } from '../../domain/user-email';
import { UserPasswordErrors } from '../../domain/user-password';
import { UserErrors } from '../../domain/user';

namespace CreateUserErrors {
  enum UseCaseErrorTypes {
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS'
  }

  export const errorTypes = {
    ...UseCaseErrorTypes,
    ...UserEmailErrors.errorTypes,
    ...UserPasswordErrors.errorTypes,
    ...UserErrors.errorTypes
  };
  export type errorTypes = typeof errorTypes;

  export const emailAlreadyExists = DomainError.create(
    errorTypes.EMAIL_ALREADY_EXISTS,
    (email: string) =>
      `The email '${email}' already has an account associated with it.`
  );

  export const { invalidEmail } = UserEmailErrors;
  export const { invalidPassword } = UserPasswordErrors;
  export const { invalidProps } = UserErrors;
}

export default CreateUserErrors;
