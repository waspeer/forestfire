import uuid from 'uuid/v4';
import Identifier from './identifier';

/**
 * A unique Identifier for Entities.
 */
export default class UniqueEntityID extends Identifier<string | number> {
  /**
   * Create a UniqueEntityID.
   *
   * If no id is given the Identifier will be instantiated with a `uuid/v4`
   *
   * @param {string|number} [id] - A UniqueEntityID value
   */
  constructor(id?: string | number) {
    super(id || uuid());
  }
}
