/**
 * Generic ValueObject properties
 */
interface ValueObjectProps {
  [index: string]: any;
}

/**
 * Base ValueObject class
 */
export default abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T;

  /**
   * Create a ValueObject
   *
   * Props are stored in a protected `props` property. The subclass is expected
   * to decide which getters and setter should be defined.
   *
   * @param {object.<string, any>} props - The properties of the ValueObject
   */
  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  /**
   * Determines if the passed ValueObject is equal to this ValueObject.
   *
   * @param {ValueObject} id - The ValueObject that is to be tested.
   * @returns {boolean}
   */
  public equals(object: ValueObject<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (object.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(object.props);
  }
}
