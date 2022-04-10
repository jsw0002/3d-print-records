import { useEffect, useState } from 'react';
import { supabase } from '../client';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function PrintCard(props) {
  const { name, material_cost, filament_length, filament_used, printing_time, img_url, quantity } = props.print;
  const [filament, setFilament] = useState({});

  useEffect(() => {
    fetchFilament();
  }, []);

  async function fetchFilament() {
    if (props.print) {
      const { data } = await supabase
        .from("filaments")
        .select("*")
        .eq("id", filament_used);
        setFilament(data[0]);
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image={img_url}
        alt={name.replace(/\s+/g, '-').toLowerCase()}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Material Cost: ${material_cost/100}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Filament Used: {filament.brand} {filament.color} {filament.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amount of Filament Used: {filament_length/100}m
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Print Time: {Math.floor(printing_time/60)}h {printing_time % 60}m
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip avatar={<Avatar>{quantity}</Avatar>} label="Quantity Printed" variant="outlined" color="primary" size="small" />
        </Stack>
      </CardActions>
    </Card>
  );
}