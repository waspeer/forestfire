/* eslint-disable max-classes-per-file */
import { UseDomainEvents } from '@forestfire/core';
import { BaseEntity } from 'typeorm';
import { DomainEvents } from '../domain';
import IUserRepo from './user-repo';
import User from '../domain/user';
import UserEmail from '../domain/user-email';
import UserMap from '../mappers/user-map';

abstract class IOrmUserEntity extends BaseEntity {
  id!: string;
  email!: string;
  passwordHash!: string;
}

export default class TypeOrmUserRepo implements IUserRepo {
  private activeRecord: typeof IOrmUserEntity;

  constructor(activeRecord: typeof IOrmUserEntity) {
    this.activeRecord = activeRecord;
  }

  public async findUserByEmail(email: UserEmail): Promise<User | null> {
    const ormUserOrUndefined = await this.activeRecord.findOne({
      email: email.value
    });
    if (typeof ormUserOrUndefined === 'undefined') return null;
    return UserMap.toDomain(ormUserOrUndefined);
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const ormUser = await this.activeRecord.findOne({
      email: email.value
    });
    return !!ormUser;
  }

  @UseDomainEvents(DomainEvents)
  public async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const ormUser = this.activeRecord.create(UserMap.toPersistence(user));
      await ormUser.save();
    } else {
      const ormUser = (await this.activeRecord.findOne({
        email: user.email.value
      })) as IOrmUserEntity;
      this.activeRecord.merge(ormUser, UserMap.toPersistence(user));
      await ormUser.save();
    }
  }
}
