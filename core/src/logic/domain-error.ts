/* eslint-disable no-inner-declarations */

/**
 * The generic interface of the errors in the domain.
 *
 * @template ErrorType - The type of the error.
 */
export interface IDomainError<ErrorType extends string> {
  type?: ErrorType;
  message: string;
  error?: any;
}

interface MessageCreator {
  (...args: any[]): string;
}

namespace DomainError {
  export function create<T extends string, M extends MessageCreator>(
    type: T,
    message: M | string
  ) {
    return function domainError(...args: Parameters<M>): IDomainError<T> {
      return {
        type,
        message: typeof message === 'function' ? message(...args) : message
      };
    };
  }

  const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR' as const;
  export function unexpected(e: any): IDomainError<typeof UNEXPECTED_ERROR> {
    console.error(e);
    return {
      type: UNEXPECTED_ERROR,
      message: 'an unexpected error occured',
      error: e
    };
  }
}

export default DomainError;
