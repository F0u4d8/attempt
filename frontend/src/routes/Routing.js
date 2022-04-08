import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from '../screens/auth/AdminLogin';
import Register from '../screens/auth/Register';
import Account from '../screens/dashboard/Account';
import Categories from '../screens/dashboard/Categories';
import CreateCategories from '../screens/dashboard/CreateCategorie';
import CreateProduct from '../screens/dashboard/CreateProduct';
import Products from '../screens/dashboard/Products';
import UpdateCategory from '../screens/dashboard/UpdateCategory';
import Private from './Private.js';
import Public from './Public';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path='register' element={<Register/>}/>
        </Route>
        <Route path="dashboard">
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:page" element={<Categories />} />
          <Route path="create-category" element={<CreateCategories />} />
          <Route path="update-category/:id" element={<UpdateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
