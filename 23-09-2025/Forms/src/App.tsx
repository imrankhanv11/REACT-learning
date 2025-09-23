import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './assets/Navbar'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';

 

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MUI' element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
