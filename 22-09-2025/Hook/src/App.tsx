import { ToastContainer } from 'react-toastify'
import './App.css'
import './css/theme.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './pages/DashBoard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position='top-right' autoClose={2000} />

      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
