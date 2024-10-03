import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import defaultPhoto from '../lib/defaultPhoto'
import { MenuContext } from '../context/MenuContext';

export default function CartItemCard({id, quantity}) {
    console.log({id})
    const { getMenuItemById } = useContext(MenuContext);
    const item = getMenuItemById(id)
    const photoUrl = item?.photo_url?.length ? item?.photo_url : defaultPhoto[item?.category];

    return (
      <Card sx={{display: 'flex'}}>
        <CardMedia
          component="img"
          alt={item?.name}
          height="120"
          sx={{ width: 151 }}
          image={photoUrl}
        />
        <CardContent>
          <Typography variant="body1" component="div">
            {item?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Price: ${item?.price}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Calories: ${item?.calories}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Quantity: ${quantity}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`item Subtotal: ${quantity * item?.price}`}
          </Typography>
        </CardContent>
      </Card>
    )
}
