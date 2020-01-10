import UserRepo from './typeorm-user-repo';
import TypeOrmUser from '../infra/type-orm/entities/user';

const userRepo = new UserRepo(TypeOrmUser);

// eslint-disable-next-line import/prefer-default-export
export { userRepo };
