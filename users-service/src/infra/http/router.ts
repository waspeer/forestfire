import { Server, ServerRoute } from '@hapi/hapi';
import { createUserController } from '../../use-cases';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'adf'
  },
  {
    method: 'POST',
    path: '/users',
    options: {
      ...createUserController.apply()
    }
  }
];

export default class Router {
  static apply(server: Server) {
    server.route(routes);
  }
}
