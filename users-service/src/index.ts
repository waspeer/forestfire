import 'dotenv/config';
import connectToDatabase from './infra/type-orm/connection';
import { userRepo } from './repos';
import UserEmail from './domain/user-email';
import UserPassword from './domain/user-password';
import User from './domain/user';

const hoi = async () => {
  const email = UserEmail.create('hello@wannessalome.nl').value;
  const password = UserPassword.create('asdf').value;
  const user = User.create({ email, password }).value;

  await connectToDatabase();
  console.log(await userRepo.findUserByEmail(email));
};
hoi();

process.on('unhandledRejection', error => console.error(error));
