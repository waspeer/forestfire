import UserRepoBase from './user-repo-base';
import User from '../domain/user';
import UserEmail from '../domain/user-email';
import UserMap from '../mappers/user-map';

export default class TypeOrmUserRepo implements UserRepoBase {
  constructor(private activeRecord: any) {}

  public async findUserByEmail(email: UserEmail): Promise<User | null> {
    const ormUserOrUndefined = await this.activeRecord.findOne({
      email: email.value
    });
    if (typeof ormUserOrUndefined === 'undefined') return null;
    return UserMap.toDomain(ormUserOrUndefined);
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const ormUser = await this.activeRecord.findOne({ email: email.value });
    return !!ormUser;
  }

  public async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);

    try {
      if (!exists) {
        const ormUser = this.activeRecord.create(UserMap.toPersistence(user));
        await ormUser.save();
      } else {
        const ormUser = await this.activeRecord.findOne({
          email: user.email.value
        });
        this.activeRecord.merge(ormUser!, UserMap.toPersistence(user));
        ormUser!.save();
      }
    } catch (e) {
      console.error(e);
    }
  }
}
