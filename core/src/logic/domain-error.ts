import { Failure, Either, IDomainError } from './result';

/**
 * Base DomainError class.
 */
export default abstract class DomainError extends Failure<IDomainError> {}

/**
 * Represents a return value that is either a DomainError or a succesful
 * result of type T.
 *
 * @template T - The type of the result when it's successful.
 */
export type ErrorOr<T> = Either<IDomainError, T>;
