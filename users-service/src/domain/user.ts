import {
  Check,
  Entity,
  UniqueEntityId,
  Result,
  ErrorOr
} from '@forestfire/core';
import UserEmail from './user-email';
import UserPassword from './user-password';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

export default class User extends Entity<UserProps> {
  get id(): UniqueEntityId {
    return this.uuid;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: UserProps, id?: UniqueEntityId): ErrorOr<User> {
    const validatorResult = Check(props, [Check.exists()]);

    if (validatorResult.isFailure()) {
      return Result.fail(validatorResult.error);
    }

    return Result.ok<User>(new User(props, id));
  }
}
