import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FooterLayout from './layouts/FooterLayout'
import NavBarLayout from './layouts/NavBarLayout'
import RoutesPages from './routes/routes'
function App() {
  return (
    <div className=' d-flex flex-column min-vh-100'>
      <NavBarLayout />
      <RoutesPages />
      <FooterLayout />
    </div>
  )
}

export default App
