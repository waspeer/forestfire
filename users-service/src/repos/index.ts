import IUserRepo from './user-repo';
import TypeOrmUserRepo from './typeorm-user-repo';
import TypeOrmUser from '../infra/type-orm/entities/user';

const typeOrmUserRepo = new TypeOrmUserRepo(TypeOrmUser);

export { IUserRepo, typeOrmUserRepo as userRepo };
