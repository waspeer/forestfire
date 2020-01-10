import { Check, Result, ErrorOr, ValueObject } from '@forestfire/core';

interface UserEmailProps {
  value: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  static create(email: string): ErrorOr<UserEmail> {
    const validatorResult = Check({ email }, [Check.isEmail()]);

    if (validatorResult.isFailure()) {
      return Result.fail(validatorResult.error);
    }

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }
}
