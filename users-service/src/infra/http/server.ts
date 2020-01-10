import Hapi from '@hapi/hapi';
import Router from './router';

export default class Server {
  static async start() {
    const port = process.env.PORT || 7000;
    const host = process.env.HOST || 'localhost';

    const server = new Hapi.Server({ port, host });

    Router.apply(server);

    await server.start();
    console.info(`server is running at ${server.info.uri}`);
  }
}
