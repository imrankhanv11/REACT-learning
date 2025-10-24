import './App.css'
import NavBarFixed from './layouts/NavBarFixed'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Routers from './routes/Routers';
import FooterFixed from './layouts/FooterFixed';
import { useDispatch } from 'react-redux';
import { type AppDispathStore } from './store/store';
import { useEffect } from 'react';
import { Token } from './common/enum/token';
import { logout } from './features/authSlice';

function App() {

  const dispatch = useDispatch<AppDispathStore>();

  // If Changes in Access or RefreshToken in local Storage
  useEffect(() => {
    const handleStorageChange = () => {
      const access = localStorage.getItem(Token.accessToken);
      const refresh = localStorage.getItem(Token.refreshToken);

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
      <Routers />
      <FooterFixed />
    </div>
  )
}

export default App
