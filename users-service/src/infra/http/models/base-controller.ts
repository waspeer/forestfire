/* eslint-disable class-methods-use-this */
import { Controller } from '@forestfire/core';
import { ResponseToolkit, RouteOptionsValidate, Request } from '@hapi/hapi';
import Boom from '@hapi/boom';

export default abstract class HapiBaseController<
  IRequest,
  IResponse
> extends Controller<IRequest, IResponse> {
  protected abstract handler(request: Request, h: ResponseToolkit): any;
  protected abstract validate: RouteOptionsValidate;

  public apply() {
    const safeHandler = async (request: Request, h: ResponseToolkit) => {
      try {
        return await this.handler(request, h);
      } catch (e) {
        console.error('[BaseController] uncaught error:', e);
        return this.fail('an unexpected error occured');
      }
    };

    const validateDefaults = {
      failAction: (_req: Request, _h: ResponseToolkit, error: Boom.Boom) => {
        return Boom.badRequest(error.message);
      }
    };

    return {
      handler: safeHandler,
      validate: { ...validateDefaults, ...this.validate }
    };
  }

  public created(h: ResponseToolkit) {
    return h.response().code(201);
  }

  public badRequest(message?: string) {
    return Boom.badRequest(message);
  }

  public unauthorized(message?: string) {
    return Boom.unauthorized(message);
  }

  public forbidden(message?: string) {
    return Boom.forbidden(message);
  }

  public notFound(message?: string) {
    return Boom.notFound(message);
  }

  public conflict(message?: string) {
    return Boom.conflict(message);
  }

  public todo() {
    return Boom.notImplemented('TODO');
  }

  public fail(error: Error | string) {
    console.error(error);

    const response = Boom.internal(error.toString());
    response.reformat(process.env.NODE_ENV === 'development');
    return response;
  }
}
