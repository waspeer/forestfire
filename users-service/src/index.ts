import 'dotenv/config';

import connectToDatabase from './infra/type-orm/connect';
import startServer from './infra/http/start-server';
import { DomainEvents, UserEvents } from './domain';

async function init() {
  await connectToDatabase();
  await startServer();

  DomainEvents.on(UserEvents.eventTypes.USER_CREATED, e => console.log(e));
}

init();

process.on('unhandledRejection', error => console.error(error));
