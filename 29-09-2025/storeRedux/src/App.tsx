import AppNavbar from './layouts/Navbar';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppFooter from './layouts/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Student from './pages/student';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className='d-flex flex-column min-vh-100'>
        <AppNavbar />
        <Routes>
          <Route path='/form1' element={<Student />} />
          <Route path="/" element={< Dashboard />} />
        </Routes>
        <AppFooter />
      </div>
    </BrowserRouter>

  )
}

export default App
