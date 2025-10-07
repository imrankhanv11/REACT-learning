import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from 'react-router-dom';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className=' d-flex flex-column min-vh-100'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products" element={< Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App