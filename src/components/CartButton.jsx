
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '../store/cartStore';

export default function CartButton() {
  const { cartCount, toggleCartIsOpen } = useCartStore();

  return (
    <IconButton onClick={toggleCartIsOpen} sx={{color: 'white'}}>
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