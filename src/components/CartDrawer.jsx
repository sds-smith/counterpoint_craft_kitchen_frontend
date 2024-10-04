
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useCartStore } from '../store/store';
import CartItemCard from './CartItemCard';

const capitalize = (string) => string ? string[0].toUpperCase() + string.slice(1) : ''

export default function CartDrawer() {
    const { 
      cartIsOpen, 
      toggleCartIsOpen, 
      cartItems, 
      cartTotal, 
      method, 
      updateMethod 
    } = useCartStore();

    const switchMethod = {
        pickup: {startIcon: <DeliveryDiningIcon />, to: 'Delivery', update: 'delivery'},
        delivery: {startIcon: <StorefrontIcon />, to: 'Pick Up', update: 'pickup'}
    }

    const handleSwitchMethod = () => {
      updateMethod(switchMethod[method].update)
    }

  return (
    <Drawer 
      open={cartIsOpen} 
      onClose={toggleCartIsOpen} 
      anchor='bottom'
    >
      <Box sx={{height: '70vh'}}>
        <Typography variant='h4' textAlign='center'>
          My {capitalize(method)} Order
        </Typography>
        <Button fullWidth variant="outlined" startIcon={switchMethod[method]?.startIcon} onClick={handleSwitchMethod}>
          {`Switch to ${switchMethod[method]?.to}`}
        </Button>
        {Object.entries(cartItems).map(([id, quantity]) => (
          <CartItemCard 
            key={id} 
            id={id} 
            quantity={quantity} 
          />
      ))}
        <Typography variant='h5' >{`Subtotal: $${cartTotal}`}</Typography>
      </Box>
    </Drawer>
  );
}