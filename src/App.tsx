import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import Navigation from './routes/Navigation'
import Landing from './components/Landing'
import Menu from './components/Menu'
import Category from './components/Category'
import ItemOrderPage from './components/ItemOrderPage';
import { MenuContext } from './context/MenuContext';
import { theme } from './utils/theme';

import './App.css'

function App() {
  const { loadingMenu } = useContext(MenuContext);
  
  return (
    <ThemeProvider theme={theme} >
      { loadingMenu
        ? <h1>Loading</h1>
        : (
          <Routes>
            <Route path='/' element={<Navigation />}>
              <Route index element={<Landing />} />
              <Route path='menu' element={<Menu />} />
              <Route path='menu/:category' element={<Category />} />
              <Route path='menu/:category/:item' element={<ItemOrderPage />} />
            </Route>
          </Routes>
        )
      }
    </ThemeProvider>
  )
}

export default App
