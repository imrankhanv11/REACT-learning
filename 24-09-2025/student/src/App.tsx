import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBarLayout from './layouts/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBord from './pages/DashBoard';
import Teacher from './pages/Teachers';
import NotFound from './pages/NotFound';
import StudentsPage from './pages/StudentPage';
import AppFooter from './layouts/Footer';

function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <BrowserRouter>
        <NavBarLayout />
        <Routes>
          <Route path='/' element={<DashBord />} />
          <Route path='/form1' element={<StudentsPage />} />
          <Route path='/form2' element={<Teacher />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </div>
  )
}

export default App