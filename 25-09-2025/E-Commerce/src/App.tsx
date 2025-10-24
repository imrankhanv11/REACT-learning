import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </>
  )
}

export default App
