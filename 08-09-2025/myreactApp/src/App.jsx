import './App.css';
import Navbar from "./components/nav";
import Footer from './components/footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './Pages/About'
import Home from "./Pages/Home"
import Contact from './Pages/Contact'
import Form from './Pages/Form'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
