import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import About from './About.jsx';
import Navigate from './Navigae.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {
        <>
        <App/>
        <About name="imran"/>
        <About name="khan"/>
        <Navigate />
        </>
      }
      />

      <Route path='/about' element={<About name="HELLO"/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
