import 'dotenv/config';

import connectToDatabase from './infra/type-orm/connect';
import startServer from './infra/http/start-server';
import { userRepo } from './repos';
import { UserEmail, UserPassword, User } from './domain';

async function init() {
  await connectToDatabase();
  await startServer();

  const email = UserEmail.create('hello@wannessalome.nl').value;
  const oldUser = await userRepo.findUserByEmail(email);
  const password = UserPassword.create({ value: 'asdf', hashed: true }).value;
  const newUser = User.create({ email, password }, oldUser!.id).value;
  console.log(await userRepo.save(newUser));
}

init();

process.on('unhandledRejection', error => console.error(error));
