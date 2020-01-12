/* eslint-disable import/no-cycle */
import { Mapper, UniqueEntityId } from '@forestfire/core';
import User from '../domain/user';
import UserEmail from '../domain/user-email';
import UserPassword from '../domain/user-password';
import { UserDTO } from '../dtos';

export default class UserMap extends Mapper<User> {
  static toPersistence(user: User) {
    return {
      id: user.id.toString(),
      email: user.email.value,
      passwordHash: user.password.value
    };
  }

  static toDomain(raw: any): User {
    return User.create(
      {
        email: UserEmail.create(raw.email).value,
        password: UserPassword.create({
          value: raw.passwordHash,
          hashed: true
        }).value
      },
      new UniqueEntityId(raw.id)
    ).value;
  }

  static toDTO(user: User): UserDTO {
    return {
      email: user.email.value
    };
  }
}
