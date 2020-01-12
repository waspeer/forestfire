import Entity from './entity';
import DomainEvent from './domain-event';

export default abstract class AggregateRoot<T> extends Entity<T> {
  private _eventQueue: DomainEvent<any>[] = [];

  get eventQueue(): DomainEvent<any>[] {
    return this._eventQueue;
  }

  protected queueEvent<E extends string>(domainEvent: DomainEvent<E>): void {
    this._eventQueue.push(domainEvent);
    console.info(
      '[domain event created]:',
      Reflect.getPrototypeOf(this).constructor.name,
      '==>',
      domainEvent.type
    );
  }

  public clearEvents(): void {
    this._eventQueue = [];
  }
}
