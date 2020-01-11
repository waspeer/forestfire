import {
  Check,
  Result,
  EitherResponse,
  ValueObject,
  DomainError
} from '@forestfire/core';

interface UserEmailProps {
  value: string;
}

export namespace UserEmailErrors {
  export enum errorTypes {
    INVALID_EMAIL = 'INVALID_EMAIL'
  }

  export const invalidEmail = DomainError.create(
    errorTypes.INVALID_EMAIL,
    (message?) => message || 'email address is invalid'
  );
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  static create(
    email: string
  ): EitherResponse<UserEmailErrors.errorTypes, UserEmail> {
    const validatorResult = Check({ email }, [Check.isEmail()]);

    if (validatorResult.isFailure()) {
      return Result.fail(
        UserEmailErrors.invalidEmail(validatorResult.error.message)
      );
    }

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }
}
