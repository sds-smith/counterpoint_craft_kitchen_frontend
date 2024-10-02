
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ItemCard({item}) {
  const photoUrl = item.photo_url?.length ? item.photo_url : '/assets/clay-banks-ZTtaJjiF_0M-unsplash.jpg';

  return (
    <Card >
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
