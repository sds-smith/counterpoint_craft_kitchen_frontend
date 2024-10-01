
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ItemCard({item}) {
  return (
    <Card >
      <CardMedia
        component="img"
        alt={item.name}
        height="140"
        image={item.photo_url || '/src/assets/clay-banks-ZTtaJjiF_0M-unsplash.jpg'}
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
