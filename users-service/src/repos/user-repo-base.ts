import User from '../domain/user';
import UserEmail from '../domain/user-email';

export default interface UserRepoBase {
  findUserByEmail(email: UserEmail): Promise<User | null>;
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}
