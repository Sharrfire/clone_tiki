import config from '~/config';
//Pages
// import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
//Layout

//PublicRoutes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  // { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
