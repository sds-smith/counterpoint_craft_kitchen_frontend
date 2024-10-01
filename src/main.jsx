import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MenuProvider } from './context/MenuContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuProvider>
  </StrictMode>,
)
