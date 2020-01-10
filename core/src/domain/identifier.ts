/**
 * Base Identifier class.
 *
 * @template T - The type of the Identifier's value
 */
export default class Identifier<T> {
  private _value: T;

  /**
   * Create an Identifier.
   *
   * @param {any} value - The value of the Identifier.
   */
  constructor(value: T) {
    this._value = value;
  }

  /**
   * Determines if the passed Identifier is equal to this Identifier.
   *
   * @param {Identifier} id - The Identifier that is to be tested.
   * @returns {boolean}
   */
  equals(id: Identifier<T>): boolean {
    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.value === this._value;
  }

  toString() {
    return String(this._value);
  }

  get value(): T {
    return this._value;
  }
}
