import bcrypt from 'bcrypt';
import {
  Check,
  EitherResponse,
  Result,
  ValueObject,
  DomainError
} from '@forestfire/core';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export namespace UserPasswordErrors {
  export enum errorTypes {
    INVALID_PASSWORD = 'INVALID_PASSWORD'
  }

  export const invalidPassword = DomainError.create(
    errorTypes.INVALID_PASSWORD,
    (message?) => message || 'password is invalid'
  );
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  get value() {
    return this.props.value;
  }

  get hashed() {
    return this.props.hashed;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.props.value);
  }

  static create(
    props: UserPasswordProps
  ): EitherResponse<UserPasswordErrors.errorTypes, UserPassword> {
    const validatorResult = Check({ password: props.value }, [Check.exists()]);

    if (validatorResult.isFailure()) {
      return Result.fail(
        UserPasswordErrors.invalidPassword(validatorResult.error.message)
      );
    }

    const hashedProps = {
      value: props.hashed
        ? props.value
        : bcrypt.hashSync(props.value, bcrypt.genSaltSync(12)),
      hashed: true
    };

    return Result.ok<UserPassword>(new UserPassword(hashedProps));
  }
}
