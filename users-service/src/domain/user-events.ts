/* eslint-disable no-inner-declarations */
import { DomainEvent } from '@forestfire/core';
import UserMap from '../mappers/user-map';

namespace UserEvents {
  export enum eventTypes {
    USER_CREATED = 'user/created'
  }

  export function created(user: any): DomainEvent<eventTypes.USER_CREATED> {
    return {
      type: eventTypes.USER_CREATED,
      aggregateId: user.id,
      occured: new Date(),
      payload: UserMap.toDTO(user)
    };
  }
}

export default UserEvents;
