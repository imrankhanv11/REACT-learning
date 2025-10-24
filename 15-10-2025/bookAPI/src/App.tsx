import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FooterLayout from './layouts/FooterLayout'
import NavBarLayout from './layouts/NavBarLayout'
import RoutesPages from './routes/routes'
import { useDispatch } from 'react-redux';
import { type AppDispathStore } from './store/store';
import { useEffect } from 'react';
import { logout } from './features/authSlice';
import { token } from './commons/enums/TokenStorage';

function App() {

  const dispatch = useDispatch<AppDispathStore>();

  useEffect(() => {
    const handleStorageChange = () => {
      const access = localStorage.getItem(token.accessTokenLC);
      const refresh = localStorage.getItem(token.refreshTokenLC);

      if (!access || !refresh) {
        dispatch(logout());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);


  return (
    <div className=' d-flex flex-column min-vh-100'>
      <NavBarLayout />
      <RoutesPages />
      <FooterLayout />
    </div>
  )
}

export default App
