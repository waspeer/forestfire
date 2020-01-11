import Hapi from '@hapi/hapi';
import Router from './router';

export default async function startServer() {
  const port = process.env.PORT || 7000;

  const server = new Hapi.Server({ port });

  Router.apply(server);

  await server.start();
  console.info(`server is running at ${server.info.uri}`);
}
