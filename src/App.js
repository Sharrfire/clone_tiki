import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductFeature from './features/Product';
import DetailPage from './features/Product/pages/DetailPage';
import ListPage from './features/Product/pages/ListPage';
import NotFound from './pages/NotFound';
function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/home' element={<Navigate replace to='/products' />} />
        <Route path='/' element={<Navigate replace to='/products' />} />
        <Route path='products/*' element={<ProductFeature />}>
          <Route path='' element={<ListPage />} />
          <Route path=':productId/*' element={<DetailPage />}></Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* Footer */}
    </div>
  );
}

export default App;
