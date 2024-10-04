
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useCartStore } from '../store/store';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Footer() {
  const { method, toggleCartIsOpen, cartIsOpen } = useCartStore();
  const navigate = useNavigate();
  const fabIcon = {
    pickup: {icon: <StorefrontIcon/>},
    delivery: {icon: <DeliveryDiningIcon/>}
  }

  const handleClickHome = () => {
    if (cartIsOpen) toggleCartIsOpen()
    navigate('/')
  }

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, zIndex: 3 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="home button" onClick={handleClickHome}>
            <HomeIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add" onClick={toggleCartIsOpen}>
            {fabIcon[method]?.icon || null}
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
