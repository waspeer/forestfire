/* eslint-disable no-inner-declarations */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["isFailure", "isSuccess", "value", "error"] }] */
/* eslint max-classes-per-file: ["error", 2] */

import { IDomainError } from './domain-error';

/**
 * The errorType of an untyped error
 */
const UNTYPED_ERROR = 'UNTYPED_ERROR' as const;

/**
 * Base Failure class.
 */
export class Failure<L extends IDomainError<any>, A = any> {
  readonly error: L;

  /**
   * Create a Failure result.
   *
   * @param {any} error - The error that occured
   */
  constructor(error: L) {
    this.error = {
      ...error,
      type: error.type || UNTYPED_ERROR
    } as L;
  }

  get value(): A {
    // The structure of the Failure class should be the same as that
    // of the Success class so Typescript doesn't complain when trying
    // to retrieve the value of a result you know is successful.

    throw new Error('unable to retrieve value from failed result');
  }

  isFailure(): this is Failure<L, A> {
    return true;
  }

  isSuccess(): this is Success<L, A> {
    return false;
  }
}

/**
 * Base Success class
 */
export class Success<L extends IDomainError<any>, A> {
  private readonly _value?: A;

  /**
   * Create a Success result
   *
   * @param {any} value - The value of the result.
   */
  constructor(value?: A) {
    this._value = value;
  }

  get value(): A {
    // Encapsulated in a getter to exclude the `undefined` type
    // when retrieving the value.

    return this._value as A;
  }

  isFailure(): this is Failure<L, A> {
    return false;
  }

  isSuccess(): this is Success<L, A> {
    return true;
  }
}

/**
 * Repesents a type that is either a successful result or an error.
 *
 * @template L - The type of the unsuccesful result.
 * @template A - The type of the successful result.
 */
export type Either<L extends IDomainError<any>, A> =
  | Failure<L, A>
  | Success<L, A>;

/**
 * Represents a return value that is either a DomainError or a succesful
 * result of type T.
 *
 * @template T - The type of the result when it's successful.
 */
export type ErrorOr<T> = Either<IDomainError<any>, T>;

/**
 * Represents a return value that is either a typed or untyped domainError or
 * a successful result.
 *
 * @template E - The possible errorTypes.
 * @template R - The type of the result.
 */
export type EitherResponse<E extends string, R> = Either<
  IDomainError<E> | IDomainError<any>,
  R
>;

/**
 * A result that is either successful or unsuccessful.
 * @typedef {(Success|Failure)} Result
 */
namespace Result {
  /**
   * Create a Failure result
   *
   * @constructs Failure
   * @param {(string|{message: string, error: any})} l - The domain error that occured.
   * Can be either a string or implement the IDomainError interface
   */
  export function fail<L extends string, A = any>(
    l: L
  ): Either<IDomainError<any>, A>;
  export function fail<L extends IDomainError<any>, A = any>(
    l: L
  ): Either<L, A>;
  export function fail(l: any): any {
    if (typeof l === 'string') return new Failure({ message: l });
    return new Failure(l);
  }

  /**
   * Create a Success result
   *
   * @constructs Success
   * @param {any} a - The value of the result.
   */
  export function ok<A, L extends IDomainError<any> = IDomainError<any>>(
    a?: A
  ): Either<L, A> {
    return new Success<L, A>(a);
  }

  /**
   * When given an array of results it will either return the first error
   * it finds or return a Success result
   *
   * @param {Array.<Result>} results
   */
  export function combine<L extends IDomainError<any>, A>(
    results: Either<L, A>[]
  ): Either<L, A> {
    return results.reduce((combinedResult, result) => {
      if (combinedResult.isFailure()) {
        return combinedResult;
      }

      return result;
    }, Result.ok());
  }
}

export default Result;
