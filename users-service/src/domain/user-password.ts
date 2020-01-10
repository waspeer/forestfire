import { Check, ErrorOr, Result, ValueObject } from '@forestfire/core';

interface UserPasswordProps {
  value: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  static create(password: string): ErrorOr<UserPassword> {
    const validatorResult = Check({ password }, [Check.exists()]);

    if (validatorResult.isFailure()) {
      return Result.fail(validatorResult.error);
    }

    return Result.ok<UserPassword>(new UserPassword({ value: password }));
  }
}
