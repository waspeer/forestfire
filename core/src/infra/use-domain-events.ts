/* eslint-disable no-param-reassign */
import { AggregateRoot, DomainEvents } from '../domain';

export default function UseDomainEvents(domainEvents: DomainEvents) {
  return function UseDomainEventsDecorator(
    _target: any,
    _propertyKey: any,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function EmitEventsWhenSuccessful(
      aggregate: AggregateRoot<any>,
      ...rest: any[]
    ) {
      try {
        const result = await originalMethod.call(this, aggregate, ...rest);
        domainEvents.emitEventsOf(aggregate);
        return result;
      } catch (e) {
        aggregate.clearEvents();
        throw e;
      }
    };
  };
}
