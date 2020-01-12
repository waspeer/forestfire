export default interface DomainEvent<T extends string> {
  type: T;
  occured: Date;
  aggregateId: string;
  payload?: any;
}
