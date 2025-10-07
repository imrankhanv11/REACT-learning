import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '../src/context/themContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
