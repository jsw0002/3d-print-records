import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProjectCard(props) {
  const { id, name, img_url } = props.project;
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/projects/${id}`, { state: props.project })}>
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
          {/* <Typography variant="body2" color="text.secondary">
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
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions sx={{ justifyContent: "space-between" }}>
        <Button href={stl_source} target="_blank" size="small" sx={{ fontWeight: "bold" }} disabled={!stl_source}>STL File</Button>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip avatar={<Avatar>{quantity}</Avatar>} label="Quantity" variant="outlined" color="primary" size="small" />
        </Stack>
      </CardActions> */}
    </Card>
  )
}