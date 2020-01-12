/* eslint-disable import/no-cycle */
import {
  AggregateRoot,
  Check,
  EitherResponse,
  UniqueEntityId,
  Result,
  DomainError
} from '@forestfire/core';
import UserEmail from './user-email';
import UserPassword from './user-password';
import UserEvents from './user-events';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

export namespace UserErrors {
  export enum errorTypes {
    INVALID_PROPS = 'INVALID_PROPS'
  }

  export const invalidProps = DomainError.create(
    errorTypes.INVALID_PROPS,
    (message?) => message || 'provided properties are invalid'
  );
}

export default class User extends AggregateRoot<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(
    props: UserProps,
    id?: UniqueEntityId
  ): EitherResponse<UserErrors.errorTypes, User> {
    const validatorResult = Check(props, [Check.exists()]);

    if (validatorResult.isFailure()) {
      return Result.fail(
        UserErrors.invalidProps(validatorResult.error.message)
      );
    }

    const user = new User(props, id);

    const isNewUser = !id;
    if (isNewUser) {
      user.queueEvent(UserEvents.created(user));
    }

    return Result.ok<User>(user);
  }
}
