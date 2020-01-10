import { Server } from '@hapi/hapi';
import hapiAuthJwt from 'hapi-auth-jwt2';

const secret = process.env.AUTH_SECRET;

const validate = () => {
  return true;
};

export default class Plugins {
  static async register(server: Server) {
    await server.register(hapiAuthJwt);
    server.auth.strategy('jwt', 'jwt', {
      key: secret,
      validate
    });
    // server.auth.d
  }
}
