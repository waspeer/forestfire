/**
 * Base useCase interface
 *
 * @template IRequest - The interface of the request argument.
 * @template IResponse - The interface of the response of the useCase.
 */
export default interface UseCase<IRequest, IResponse> {
  /**
   * Executes the use case.
   *
   * @param {object} request - The request containing the arguments to
   * execute the useCase
   * @returns {(Promise|object)}
   */
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
