import 'dotenv/config';

import connectToDatabase from './infra/type-orm/connect';
import startServer from './infra/http/start-server';
import { userRepo } from './repos';
import {
  DomainEvents,
  UserEmail,
  UserEvents,
  UserPassword,
  User
} from './domain';

async function init() {
  await connectToDatabase();
  await startServer();
  DomainEvents.on(UserEvents.eventTypes.USER_CREATED, e => console.log(e));
  const email = UserEmail.create('hello@wannessalome.nl').value;
  const password = UserPassword.create({ value: 'asdf', hashed: true }).value;
  const newUser = User.create({ email, password }).value;
  await userRepo.save(newUser);
}

init();

process.on('unhandledRejection', error => console.error(error));
