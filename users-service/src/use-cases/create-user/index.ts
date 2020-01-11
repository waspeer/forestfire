import CreateUserUseCase from './create-user-use-case';
import { userRepo } from '../../repos';
import CreateUserController from './hapi-create-user-controller';

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
