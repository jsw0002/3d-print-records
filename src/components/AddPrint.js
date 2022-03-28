import { useEffect, useState } from 'react';
import { supabase } from '../client';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

function AddPrint(props) {
  const printStarter = { name: "", material_cost: 0.00, filament_length_m: 0.00, filament_weight_kg: 0.0000, filament_used: 0, printing_time: 0.00000, img_url: "" };
  const [filaments, setFilaments] = useState([]);
  const [print, setPrint] = useState(printStarter);
  const { name, material_cost, filament_length_m, filament_weight_kg, filament_used, printing_time, img_url } = print;
  
  useEffect(() => {
    fetchFilaments();
  }, [])

  async function fetchFilaments() {
    const { data } = await supabase
      .from('filaments')
      .select();
    console.log('filament data: ', data);
    const filteredData = data.map(d => ({
      value: d.id,
      label: `${d.color}/${d.type}`,
    }));
    setFilaments(filteredData);
  }

  async function createPrint() {
    await supabase
      .from('prints')
      .insert([
        { name, material_cost, filament_length_m, filament_weight_kg, filament_used, printing_time, img_url }
      ])
      .single();
    setPrint(printStarter);
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
      <h1>Add a Print</h1>
      <FormControl>
        <TextField
          label="Name"
          variant="outlined"
          id="name-input"
          placeholder="Name"
          value={name}
          type="text"
          onChange={e => setPrint({ ...print, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Material Cost"
          variant="outlined"
          id="cost-input"
          placeholder="Material Cost"
          value={material_cost}
          type="number"
          onChange={e => setPrint({ ...print, material_cost: e.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Filament Length"
          variant="outlined"
          id="length-input"
          placeholder="Filament Length"
          value={filament_length_m}
          type="number"
          onChange={e => setPrint({ ...print, filament_length_m: e.target.value })}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Filament Weight"
          variant="outlined"
          id="weight-input"
          placeholder="Filament Weight"
          value={filament_weight_kg}
          type="number"
          onChange={e => setPrint({ ...print, filament_weight_kg: e.target.value})}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="filament-input"
          select
          label="Filament Used"
          value={filament_used}
          onChange={e => setPrint({ ...print, filament_used: e.target.value })}
        >
          {filaments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          label="Printing Time"
          variant="outlined"
          id="time-input"
          placeholder="Printing Time"
          value={printing_time}
          type="number"
          onChange={e => setPrint({ ...print, printing_time: e.target.value })}
          InputProps={{
            endAdornment: <InputAdornment position="end">h</InputAdornment>,
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Image URL"
          variant="outlined"
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