import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import NotFound from '~/pages/Profile';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/components/Layout';
//Layout
<HeaderOnly />;
//PublicRoutes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/following', component: Following },
  { path: '/profile', component: Profile },
  { path: '/profile', component: NotFound },
  { path: '/search', component: Search, layout: null },
  //   { path: '/', component: Home, layout: DefaultLayout },
  //   { path: '/following', component: Following, layout: DefaultLayout },
  //   { path: '/profile', component: Profile, layout: null },
  //   { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
