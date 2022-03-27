import { useState } from 'react';
import { supabase } from '../client';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

function AddPrint() {
  const printStarter = { name: "", material_cost: 0.00, filament_length_m: 0.00, filament_weight_kg: 0.0000, filament_used: 0, printing_time: 0.00000, img_url: "" };
  const [print, setPrint] = useState(printStarter);
  const { name, material_cost, filament_length_m, filament_weight_kg, filament_used, printing_time, img_url } = print;
  
  async function createPrint() {
    await supabase
      .from('prints')
      .insert([
        { name, material_cost, filament_length_m, filament_weight_kg, filament_used, printing_time, img_url }
      ])
      .single();
    setPrint(printStarter);
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
      <h1>Add Print</h1>
      <FormControl>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <OutlinedInput
          id="name-input"
          placeholder="Name"
          value={name}
          type="text"
          onChange={e => setPrint({ ...print, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="cost-input">Material Cost</InputLabel>
        <OutlinedInput
          id="cost-input"
          placeholder="Material Cost"
          value={material_cost}
          type="number"
          onChange={e => setPrint({ ...print, material_cost: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="length-input">Filament Length</InputLabel>
        <OutlinedInput
          id="length-input"
          placeholder="Filament Length"
          value={filament_length_m}
          type="number"
          onChange={e => setPrint({ ...print, filament_length_m: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="weight-input">Filament Weight</InputLabel>
        <OutlinedInput
          id="weight-input"
          placeholder="Filament Weight"
          value={filament_weight_kg}
          type="number"
          onChange={e => setPrint({ ...print, filament_weight_kg: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="filament-input">Filament Used</InputLabel>
        <OutlinedInput
          id="filament-input"
          placeholder="Filament Used"
          value={filament_used}
          type="number"
          onChange={e => setPrint({ ...print, filament_used: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="time-input">Printing Time</InputLabel>
        <OutlinedInput
          id="time-input"
          placeholder="Printing Time"
          value={printing_time}
          type="number"
          onChange={e => setPrint({ ...print, printing_time: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="url-input">Image URL</InputLabel>
        <OutlinedInput
          id="url-input"
          placeholder="Image URL"
          value={img_url}
          type="url"
          onChange={e => setPrint({ ...print, img_url: e.target.value })}
        />
      </FormControl>        
      <Button onClick={createPrint}>Create Print</Button>
    </Box>
  );
}

export default AddPrint;