import Hapi from '@hapi/hapi';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'hello world'
  }
];

export default class Router {
  static apply(server: Hapi.Server) {
    server.route(routes);
  }
}
