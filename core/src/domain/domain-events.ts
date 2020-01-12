import EventEmitter from 'events';
import AggregateRoot from './aggregate-root';

export default class DomainEvents extends EventEmitter {
  public emitEventsOf(aggregate: AggregateRoot<any>): void {
    const events = aggregate.eventQueue;
    events.forEach(event => this.emit(event.type, event));
  }
}
