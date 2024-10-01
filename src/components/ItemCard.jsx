
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ItemCard({item}) {
  return (
    <Card >
      <CardContent>
        <img 
          src={item.photo_url || '/src/assets/clay-banks-ZTtaJjiF_0M-unsplash.jpg'} 
          alt={item.name} 
          style={{width: '100%', height: 'auto'}}
        />
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.price}</div>
        <div>{item.calories}</div>
      </CardContent>
    </Card>
  )
}
