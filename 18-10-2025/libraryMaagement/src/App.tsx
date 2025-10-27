import './App.css'
import './styles/custom.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBarFixed from './layouts/NavBarFixed';
import FooterFixed from './layouts/FooterFixed';
import RoutersPage from './routes/routes';
import { useEffect } from 'react';
import { tokens } from './common/enums/tokens';
import { logout } from './features/authSlice';
import { useDispatch } from 'react-redux';
import type { StoreDispatch } from './store/store';
import { ToastContainer } from 'react-toastify';

function App() {

  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    const handleStorageChange = () => {
      const access = localStorage.getItem(tokens.accessToken);
      const refresh = localStorage.getItem(tokens.refreshToken);

      if (!access || !refresh) {
        dispatch(logout());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);


  return (
    <div className=' d-flex flex-column min-vh-100'>
      <NavBarFixed />
      <RoutersPage />
      <FooterFixed />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default App
