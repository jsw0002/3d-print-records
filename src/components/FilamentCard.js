import { blue, red } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import Typography from '@mui/material/Typography';

export default function FilamentCard(props) {
  const { id, type, color, price, weight, is_gone, buy_more_link, img_url, brand } = props.filament;
  const navigate = useNavigate();

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