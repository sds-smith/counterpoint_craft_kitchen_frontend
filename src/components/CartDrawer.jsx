
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useCartStore } from '../store/store';
import CartItemCard from './CartItemCard';

const capitalize = (string) => string ? string[0].toUpperCase() + string.slice(1) : ''

export default function CartDrawer() {
  const navigate = useNavigate();

    const { 
      cartIsOpen, 
      toggleCartIsOpen, 
      cartItems, 
      cartTotal, 
      method, 
      updateMethod,
      clearCart
    } = useCartStore();

    const switchMethod = {
        pickup: {startIcon: <DeliveryDiningIcon />, to: 'Delivery', update: 'delivery'},
        delivery: {startIcon: <StorefrontIcon />, to: 'Pick Up', update: 'pickup'}
    }

    const handleSwitchMethod = () => {
      updateMethod(switchMethod[method].update)
    }

    const handleClear = () => {
      clearCart();
      toggleCartIsOpen();
      navigate('/');
    }

  return (
    <Drawer 
      open={cartIsOpen} 
      onClose={toggleCartIsOpen} 
      anchor='bottom'
      sx={{zIndex: 2}}
    >
      <Box sx={{display: 'flex', flexDirection: 'column', height: '70vh', paddingBottom: '100px'}}>
        <Typography variant='h4' textAlign='center'>
          My {capitalize(method)} Order
        </Typography>
        { method && 
          <Button sx={{width: '80%', margin: '20px auto'}} variant="outlined" startIcon={switchMethod[method]?.startIcon} onClick={handleSwitchMethod}>
            {`Switch to ${switchMethod[method]?.to}`}
          </Button>
        }
        {Object.entries(cartItems).map(([id, quantity]) => (
          <CartItemCard 
            key={id} 
            id={id} 
            quantity={quantity} 
          />
        ))}
        <Typography variant='h5' >{`Subtotal: $${cartTotal}`}</Typography>
        <Button sx={{width: '80%', margin: '20px auto'}} variant="contained" startIcon={<RemoveShoppingCartIcon />} onClick={handleClear} >Clear Cart</Button>
      </Box>
    </Drawer>
  );
}