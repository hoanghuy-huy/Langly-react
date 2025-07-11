import { MainLayout } from '@/layouts';
import routesConfig from '@/config/routes';
import { HomePage } from '@/pages/HomePage';
import FavoritesPage from '@/pages/FavoritesPage';

const publicRoutes = [
  { path: routesConfig.home, component: HomePage, layout: MainLayout },
  { path: routesConfig.favorite, component: FavoritesPage, layout: MainLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
