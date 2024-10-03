import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import defaultPhoto from '../lib/defaultPhoto'
import { MenuContext } from '../context/MenuContext';

export default function ItemOrderCard() {
  const [ searchParams ] = useSearchParams();
  const itemId = searchParams.get('id');
  const { loadingMenu, getMenuItemById } = useContext(MenuContext);
  const item = getMenuItemById(itemId);

  const [ quantity, setQuantity ] = useState(0);

  const photoUrl = item?.photo_url?.length ? item?.photo_url : defaultPhoto[item?.category] || '/src/assets/grilled-cheese.jpg';

  const incrementQuantity = () => setQuantity(curr => curr + 1);
  const decrementQuantity = () => setQuantity(curr => curr - 1);

  return (
    <>
      { loadingMenu
        ? <h1>Loading . . .</h1>
        : (
            <Grid container size={{xs: 12}} spacing={1} sx={{margin: '10px'}}>
              <Card >
                <CardMedia
                  component="img"
                  alt={item?.name}
                  sx={{
                    maxHeight: '400px'
                  }}
                  image={photoUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <b>Price: </b>{item?.price}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <b>Calories: </b>{item?.calories}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <b>Description: </b>{item?.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center', alignItems: 'center'}}>
                  <Grid container spacing={1}>
                    <Grid size={{xs: 12}}>
                      <Stack direction="row" spacing={2} sx={{justifyContent: 'center', width: '100%'}}>
                        <IconButton onClick={decrementQuantity}>
                          <RemoveCircleIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{display: 'flex', alignItems: 'center'}}>
                          <b>Quantity:  </b> 
                          {quantity}
                        </Typography>
                        <IconButton onClick={incrementQuantity}>
                          <AddCircleIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid size={{xs: 1}}></Grid>
                    <Grid size={{xs: 10}} >
                        <Button variant="contained" fullWidth startIcon={<AddShoppingCartIcon />} >
                            Add to Cart
                        </Button>
                    </Grid>
                    <Grid size={{xs: 1}}></Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
        )
      }
    </>
    
  )
}
