import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductFeature from './features/Product';
import ListPage from './features/Product/pages/ListPage';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
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
