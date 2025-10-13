import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBarLayout from './layouts/NavBarLayout';
import FooterLayout from './layouts/FooterLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import PrivateRoutes from './components/PrivateRoutes';
import DashBord from './pages/DashBord';
import AdminDashBoard from './pages/adminDashBoard';
import ProductAddForm from './pages/ProductAddForm';
import NotFound from './pages/NotFound';
import Carts from './pages/Carts';

function App() {

  return (
    <div className=' d-flex flex-column min-vh-100'>
      <NavBarLayout />
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />

        {/* private Routes */}
        <Route path='/dashboard'
          element={<PrivateRoutes allowedRoles={['User']}>
            <DashBord />
          </PrivateRoutes>}
        />

        <Route path='/admin/dashboard'
          element={<PrivateRoutes allowedRoles={['Admin']}>
            <AdminDashBoard />
          </PrivateRoutes>}
        />

        <Route path='/admin/addproducts'
          element={
            <PrivateRoutes allowedRoles={['Admin']}>
              <ProductAddForm />
            </PrivateRoutes>
          }
        />

        <Route path='/cart' element={
          <PrivateRoutes allowedRoles={['User']}>
            <Carts />
          </PrivateRoutes>
        }/>

        <Route path='*' element={<NotFound />} />

      </Routes>
      <FooterLayout />
    </div>
  )
}

export default App
