import { useState } from 'react';
import { supabase } from '../client';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function AddFilament(props) {
  const filamentStarter = { type: "", color: "", price: 0.00, weight: 0, is_gone: false, buy_more_link: "", img_url: "", brand: "" };
  const [filament, setFilament] = useState(filamentStarter);
  const { type, color, price, weight, is_gone, buy_more_link, img_url, brand } = filament;
  const typeValues = [
    { value: "PLA", label: "PLA" },
    { value: "PETG", label: "PETG" },
    { value: "ABS", label: "ABS" },
  ];

  async function createFilament() {
    await supabase
      .from('filaments')
      .insert([
        { type, color, price, weight, is_gone, buy_more_link, img_url, brand }
      ])
      .single();
    setFilament(filamentStarter);
    props.toggleModal();
  }
  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        display: "flex",
        flexDirection: { xs: "column" },
      }}
    >
      <h1>Add a Filament</h1>
      <FormControl>
        <TextField
          label="Type"
          id="name-input"
          value={type}
          select
          onChange={e => setFilament({ ...filament, type: e.target.value })}
        >
          {typeValues.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          label="Brand"
          required
          variant="outlined"
          id="brand-input"
          placeholder="Brand"
          value={brand}
          type="text"
          onChange={e => setFilament({ ...filament, brand: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Color"
          required
          variant="outlined"
          id="color-input"
          placeholder="Color"
          value={color}
          type="text"
          onChange={e => setFilament({ ...filament, color: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Price"
          required
          variant="outlined"
          id="price-input"
          value={price}
          type="number"
          onChange={e => setFilament({ ...filament, price: e.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Filament Weight"
          required
          variant="outlined"
          id="weight-input"
          placeholder="Filament Weight"
          value={weight}
          type="number"
          onChange={e => setFilament({ ...filament, weight: e.target.value })}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>
          }}
        />
      </FormControl>
      <FormControl>
        <FormGroup>
          <FormControlLabel  label="Any Left?" control={
            <Switch
              id="gone-input"
              checked={is_gone}
              onChange={e => setFilament({ ...filament, is_gone: e.target.value})}
            />}
          />
        </FormGroup> 
      </FormControl>
      <FormControl>
        <TextField
          label="Buy more link"
          required
          variant="outlined"
          id="more-input"
          placeholder="Buy more link"
          value={buy_more_link}
          type="url"
          onChange={e => setFilament({ ...filament, buy_more_link: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Image URL"
          required
          variant="outlined"
          id="url-input"
          placeholder="Image URL"
          value={img_url}
          type="url"
          onChange={e => setFilament({ ...filament, img_url: e.target.value })}
        />
      </FormControl>
      <Button onClick={createFilament}>Create Filament</Button>
    </Box>
  );
}

export default AddFilament;