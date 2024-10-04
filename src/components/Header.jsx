
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderMenu from './HeaderMenu';
import Cart from './CartButton';

export default function Header() {

  return (
      <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar>
          <HeaderMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Counterpoint Craft Kitchen
          </Typography>
          <Cart />
        </Toolbar>
      </AppBar>
  );
}