
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderMenu from './HeaderMenu';
import Cart from './CartButton';

export default function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HeaderMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Counterpoint Craft Kitchen
          </Typography>
          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  );
}