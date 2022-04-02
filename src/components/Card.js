import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { blue, red } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  const { name, material_cost, filament_length, filament_used, printing_time, img_url, stl_source } = props.print;
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
        <CardActions>
          <Button href={stl_source} target="_blank" size="small" sx={{ fontWeight: "bold" }} disabled={!stl_source}>STL File</Button>
        </CardActions>
      </Card>
    );
  }
  if (props.filament) {
    const { type, color, price, weight, is_gone, buy_more_link, img_url, brand } = props.filament;
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={img_url}
          alt={`${brand} ${color} ${type} filament - ${weight/1000}kg`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {brand} {color} {type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price/100}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: {weight/1000}kg
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Any Left? {is_gone ? <span className="negative-space"><DeveloperBoardOffIcon fontSize="small" sx={{ color: red[500]}} /></span> : <span className="negative-space"><DeveloperBoardIcon fontSize="small" sx={{ color: blue[500]}} /></span>}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={buy_more_link} target="_blank" size="small" sx={{ fontWeight: "bold" }}>Buy More</Button>
        </CardActions>
      </Card>
    );
  }
  return "No card created";
}