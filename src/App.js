import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';

// import { useEffect } from 'react';

// import Heading from '~/components/Heading';
import HomePage from './pages/Home';
import ProductFeature from './features/Product';
import ListPage from './features/Product/pages/ListPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='products/*' element={<ProductFeature />}>
          <Route path='' element={<ListPage />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* Footer */}
    </div>
  );
}

export default App;
