import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './layout/Navbar';
import UseRefHook from './Hooks/UseRefHook';
import UseCallBack from "./Hooks/UseCallBackHook";
import UseMemoHook from "./Hooks/UseMemoHook";
import Home from "./Pages/Home";
import ToggleTheme from "./Hooks/ToggleTheme";
import TodoPage from "./Pages/Todo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position='top-right' autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/useref" element={<UseRefHook />} />
          <Route path="/usememo" element={<UseMemoHook />} />
          <Route path="/usecallback" element={<UseCallBack />} />
          <Route path="/toggle" element={<ToggleTheme/>} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>


      </BrowserRouter>
    </div>
  )
}

export default App
