import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter } from 'react-router-dom'
import Manager from './pages/Manager';

function App() {

  return (
    <>
        <BrowserRouter>
          <Manager />
        </BrowserRouter>
    </>
  )
}

export default App;