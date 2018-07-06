import Router from './core/routes';
import { Home } from './features';

const routes = {
  '/': () => {
    new Home().load();
  }
};

new Router().bootstrap(routes);
