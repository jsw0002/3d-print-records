import { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  console.log('props: ', props);
  const { name, material_cost, filament_length_m, filament_used, printing_time, img_url } = props.print;
  const { type, color, price, weight, is_gone } = props.filament;
  const [filament, setFilament] = useState({});

  useEffect(() => {
    fetchFilament();
  }, []);

  async function fetchFilament() {
    if (props.print) {
      const { data } = await supabase
        .from('filaments')
        .select("*")
        .eq("id", filament_used);
        setFilament(data[0]);
    }
  }

  if (props.print) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={img_url}
          alt={name.replace(/\s+/g, '-').toLowerCase()}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Material Cost: ${material_cost}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filament Used: {filament.color}/{filament.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount of Filament Used: {filament_length_m}m
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Print Time: {Math.floor(printing_time/60)}h {printing_time % 60}m
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (props.filament) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {type}
            Color: {color}
            Price: {price}
            Weight: {weight}
            Any Left?: {is_gone}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return 'No card created';
}