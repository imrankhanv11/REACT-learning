import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './layout/Navbar';
import UseRefHook from './Hooks/UseRefHook';
import UseCallBack from "./Hooks/UseCallBackHook";
import UseMemoHook from "./Hooks/UseMemoHook";
import Home from "./Pages/Home";
import ToggleTheme from "./Hooks/ToggleTheme";
import Todo from "./Pages/Todo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/useref" element={<UseRefHook />} />
          <Route path="/usememo" element={<UseMemoHook />} />
          <Route path="/usecallback" element={<UseCallBack />} />
          <Route path="/toggle" element={<ToggleTheme/>} />
          <Route path="/todo" element={<Todo />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
