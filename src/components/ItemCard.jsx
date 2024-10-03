
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import defaultPhoto from '../lib/defaultPhoto'

export default function ItemCard({item}) {
  const photoUrl = item.photo_url?.length ? item.photo_url : defaultPhoto[item.category];
  const navigate = useNavigate();
  const handleClick = () => {
    const categoryPath = item.category.toLowerCase();
    const itemPath = item.name.toLowerCase().replaceAll(' ', '_');
    const searchParams = `id=${item.id}`
    const url = `/order/${categoryPath}/${itemPath}?${searchParams}`
    navigate(url)
  }

  return (
    <Card 
      className={`item_card${item.eightysix ? '_86' : ''}`} 
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        alt={item.name}
        height="140"
        image={photoUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`Price: ${item.price}`}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`Calories: ${item.calories}`}
        </Typography>
      </CardContent>
    </Card>
  )
}
