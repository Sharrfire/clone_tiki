import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import NotFound from '~/pages/NotFound';
import { DefaultLayout } from './components/Layout';
import { Fragment } from 'react';
function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          {publicRoutes.map((route, index) => {
            // const Layout = route.layout || Fragment;
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route exact path='*' element={<NotFound />} redirectTo='/' noLayout />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
