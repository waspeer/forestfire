import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { EitherResponse } from '@forestfire/core';
import { HapiBaseController } from '../../infra/http';
import CreateUserDTO from './create-user-dto';
import CreateUserErrors from './create-user-errors';

type UseCaseResponse = EitherResponse<CreateUserErrors.errorTypes, void>;

export default class HapiCreateUserController extends HapiBaseController<
  CreateUserDTO,
  UseCaseResponse
> {
  public async handler(request: Request, h: ResponseToolkit) {
    const dto = request.payload as CreateUserDTO;

    dto.email = this.sanitize(dto.email);

    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      const { error } = result;

      switch (error.type) {
        case CreateUserErrors.errorTypes.INVALID_EMAIL ||
          CreateUserErrors.errorTypes.INVALID_PASSWORD ||
          CreateUserErrors.errorTypes.INVALID_PROPS:
          return this.badRequest(error.message);
        case CreateUserErrors.errorTypes.EMAIL_ALREADY_EXISTS:
          return this.conflict(error.message);
        default:
          return this.fail(error.message);
      }
    }

    return this.created(h);
  }

  validate = {
    payload: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  };
}
