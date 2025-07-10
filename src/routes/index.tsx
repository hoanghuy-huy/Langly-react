import { MainLayout } from '@/layouts';
import routesConfig from '@/config/routes';
import { HomePage } from '@/pages/HomePage';

const publicRoutes = [
  { path: routesConfig.home, component: HomePage, layout: MainLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
