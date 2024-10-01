
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import Navigation from './routes/Navigation'
import Landing from './components/Landing'
import Menu from './components/Menu'
import Category from './components/Category'
import { theme } from './utils/theme';

import './App.css'

function App() {

  return (
    <ThemeProvider theme={theme} >
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Landing />} />
          <Route path='order' element={<Menu />} />
          <Route path='order/:category' element={<Category />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
