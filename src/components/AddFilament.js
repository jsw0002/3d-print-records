import { useState } from 'react';
import { supabase } from '../client';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

function AddFilament(props) {
  const filamentStarter = { name: "", type: "", color: "", price: 0, weight: 0, is_gone: false };
  const [filament, setFilament] = useState(filamentStarter);
  const { type, color, price, weight, is_gone } = filament;
  
  async function createFilament() {
    await supabase
      .from('filaments')
      .insert([
        { type, color, price, weight, is_gone }
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
        <InputLabel htmlFor="type-input">Type</InputLabel>
        <OutlinedInput
          id="type-input"
          placeholder="Type"
          value={type}
          onChange={e => setFilament({ ...filament, type: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="cost-input">Color</InputLabel>
        <OutlinedInput
          id="cost-input"
          placeholder="Color"
          value={color}
          onChange={e => setFilament({ ...filament, color: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="length-input">Price</InputLabel>
        <OutlinedInput
          id="price-input"
          placeholder="Price"
          value={price}
          onChange={e => setFilament({ ...filament, price: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="weight-input">Filament Weight</InputLabel>
        <OutlinedInput
          id="weight-input"
          placeholder="Weight"
          value={weight}
          onChange={e => setFilament({ ...filament, weight: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="gone-input">Any Left?</InputLabel>
        <OutlinedInput
          id="gone-input"
          placeholder="Is Gone"
          value={is_gone}
          onChange={e => setFilament({ ...filament, is_gone: e.target.value })}
        />
      </FormControl>
      <Button onClick={createFilament}>Create Filament</Button>
    </Box>
  );
}

export default AddFilament;