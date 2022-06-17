import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import NotFound from '~/pages/NotFound';
// import { DefaultLayout } from './components/Layout';
// import { Fragment } from 'react';
function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          <Route exact path='*' element={<NotFound />} redirectTo='/' noLayout />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
