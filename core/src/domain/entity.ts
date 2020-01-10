/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import UniqueEntityID from './unique-entity-id';

/**
 * Generic Entity properties
 */
interface EntityProps {
  [index: string]: any;
}

/**
 * Base Entity class
 *
 * @template T - The type of the entity props
 */
export default abstract class Entity<T extends EntityProps> {
  protected readonly _id: UniqueEntityID;
  protected props: T;

  /**
   * Create an Entity.
   *
   * Props are stored in a protected `props` property. The subclass is expected
   * to decide which getters and setter should be defined.
   *
   * An UniqueEntityID can be passed along when it already exists (i.e. the Entity
   * is retrieved from persistence). Otherwise the Entity will be assigned a new ID.
   *
   * @param {object.<string, any>} props - The properties of the Entity
   * @param {UniqueEntityID} [id] - The unique ID of the Entity
   */
  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }

  /**
   * Determines if the passed Entity is equal to this Entity
   *
   * @param {Entity} object - The Entity that is to be tested.
   * @returns {boolean}
   */
  public equals(object: Entity<any>): boolean {
    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
