import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultPhoto from '../lib/defaultPhoto'
import { MenuContext } from '../context/MenuContext';
import { useCartStore } from '../store/cartStore';

export type cartItemCardProps = {
  id: string,
  quantity: number
}

export default function CartItemCard({id, quantity}: cartItemCardProps) {
    const { getMenuItemById } = useContext(MenuContext);
    const { removeItemFromCart, editItemQuantity } = useCartStore();
    const item = getMenuItemById(id)
    const photoUrl = item.photo_url?.length ? item?.photo_url : defaultPhoto[item.category as keyof typeof defaultPhoto];

    const [ editing, setEditing ] = useState(false);

    const handleDelete = () => removeItemFromCart(id, quantity, item.price);
    const handleEdit = () => setEditing(editing => !editing)

    const handleChange = (e: SelectChangeEvent<string>) => {
      editItemQuantity(id, Number(e.target.value), item.price);
      handleEdit();
    }

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
          { !editing
            ? <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {`Quantity: ${quantity}`}
              </Typography>
            : <FormControl variant='standard' fullWidth>
                <InputLabel id="demo-simple-select-label">Edit Quantity</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Edit Quantity"
                  onChange={handleChange}
                  inputProps={{
                    style: {height: '.5rem'}
                  }}
                >
                  { [1,2,3,4,5,6,7,8].map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </Select>
              </FormControl>
          }
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`item Subtotal: ${quantity * parseFloat(item.price)}`}
          </Typography>
        </CardContent>
        <CardActions sx={{flexDirection: 'column'}}>
          <IconButton onClick={handleEdit}>
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
}
