/** @format */

import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sucess from './pages/Sucess';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { fetchCart } from './store/thunks/cartThunks';
import { getUserDetails } from './store/thunks/userThunk';
import Page404 from './pages/404';
import UserProfile from './pages/UserProfile';
import Cookies from 'js-cookie';

const App = () => {
  const token = Cookies.get('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getStuff = async () => {
      try {
        await fetchCart(dispatch);
        await getUserDetails(dispatch);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getStuff();
    }
  }, [dispatch, token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/products' /> : <Home />}
        />
        <Route
          path='/products/*'
          element={token ? <ProductList /> : <Home />}
        />
        <Route
          path='/product/:productId'
          element={token ? <Product /> : <Home />}
        />
        <Route path='/cart' element={token ? <Cart /> : <Home />} />
        <Route
          path='/sucess'
          element={token ? <Sucess /> : <Navigate to='/register' />}
        />
        <Route
          path='/userProfile'
          element={token ? <UserProfile /> : <Home />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
