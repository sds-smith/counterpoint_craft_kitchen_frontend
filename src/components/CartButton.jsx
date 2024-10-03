
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '../store/store';

export default function CartButton() {
  const { cartItems, cartCount, cartTotal, cartIsOpen, toggleCartIsOpen } = useCartStore();

  const handleClickCart = () => {
    toggleCartIsOpen()
    console.log({cartItems, cartCount, cartTotal, cartIsOpen})
  }

  return (
    <IconButton onClick={handleClickCart} sx={{color: 'white'}}>
        <Badge 
          invisible={!cartCount}
          badgeContent={cartCount} 
          color='secondary' 
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <ShoppingCartIcon />
        </Badge>
    </IconButton>
  );
}