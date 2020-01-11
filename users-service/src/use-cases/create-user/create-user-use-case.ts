import { DomainError, EitherResponse, Result, UseCase } from '@forestfire/core';
import CreateUserDTO from './create-user-dto';
import CreateUserErrors from './create-user-errors';
import { IUserRepo } from '../../repos';
import { UserEmail, UserPassword, User } from '../../domain';

type Response = EitherResponse<CreateUserErrors.errorTypes, void>;

export default class CreateUserUseCase
  implements UseCase<CreateUserDTO, Response> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request.email);
    const passworOrError = UserPassword.create({ value: request.password });
    const combinedResult = Result.combine([emailOrError, passworOrError]);

    if (combinedResult.isFailure()) {
      return Result.fail(combinedResult.error);
    }

    const email = emailOrError.value;
    const password = passworOrError.value;

    try {
      if (await this.userRepo.exists(email)) {
        return Result.fail(CreateUserErrors.emailAlreadyExists(email.value));
      }

      const user = User.create({ email, password }).value;

      await this.userRepo.save(user);

      return Result.ok<void>();
    } catch (e) {
      return Result.fail(DomainError.unexpected(e));
    }
  }
}
