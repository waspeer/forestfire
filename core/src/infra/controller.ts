/* eslint-disable class-methods-use-this */
import sanitizeHtml from 'sanitize-html';
import { UseCase } from '../domain';

export default abstract class Controller<IRequest, IResponse> {
  protected useCase: UseCase<IRequest, IResponse>;

  constructor(useCase: UseCase<IRequest, IResponse>) {
    this.useCase = useCase;
  }

  sanitize(source: string) {
    return sanitizeHtml(source);
  }
}
