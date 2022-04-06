import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { blue, red } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  const { id, name, material_cost, filament_length, filament_used, printing_time, img_url, stl_source, quantity } = props.print;
  const [filament, setFilament] = useState({});
  const navigate = useNavigate();

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
        <CardActionArea onClick={() => navigate(`/prints/${id}`, { state: props.print })}>
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
        </CardActionArea>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button href={stl_source} target="_blank" size="small" sx={{ fontWeight: "bold" }} disabled={!stl_source}>STL File</Button>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Chip avatar={<Avatar>{quantity}</Avatar>} label="Quantity" variant="outlined" color="primary" size="small" />
          </Stack>
        </CardActions>
      </Card>
    );
  }
  if (props.filament) {
    const { id, type, color, price, weight, is_gone, buy_more_link, img_url, brand } = props.filament;
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => navigate(`/filaments/${id}`, { state: props.filament })}>
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
        </CardActionArea>
        <CardActions>
          <Button href={buy_more_link} target="_blank" size="small" sx={{ fontWeight: "bold" }}>Buy More</Button>
        </CardActions>
      </Card>
    );
  }
  return "No card created";
}