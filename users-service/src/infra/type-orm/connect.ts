import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default async function connectToDatabase() {
  await createConnection();
}
