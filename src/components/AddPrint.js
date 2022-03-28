import { useEffect, useState } from 'react';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function AddPrint(props) {
  const printStarter = { name: "", material_cost: 0.00, filament_length_m: 0.00, filament_used: 0, printing_time: 0, img_url: "", stl_source: "", needs_raft: false, needs_supports: false, issues: "" };
  const [filaments, setFilaments] = useState([]);
  const [print, setPrint] = useState(printStarter);
  const { name, material_cost, filament_length_m, filament_used, printing_time, img_url, stl_source, needs_raft, needs_supports, issues } = print;

  useEffect(() => {
    fetchFilaments();
  }, [])

  async function fetchFilaments() {
    const { data } = await supabase
      .from("filaments")
      .select();
    const filteredData = data.map(d => ({
      value: d.id,
      label: `${d.brand} ${d.color} ${d.type}`,
    }));
    setFilaments(filteredData);
  }

  async function createPrint() {
    await supabase
      .from("prints")
      .insert([
        { name, material_cost, filament_length_m, filament_used, printing_time, img_url, stl_source, needs_raft, needs_supports, issues }
      ])
      .single();
    setPrint(printStarter);
    props.hideModal();
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
          required
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
          required
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
          required
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
          required
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
          required
          variant="outlined"
          id="url-input"
          placeholder="Image URL"
          value={img_url}
          type="url"
          onChange={e => setPrint({ ...print, img_url: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Source of STL"
          required
          variant="outlined"
          id="stl-input"
          placeholder="Source of STL"
          value={stl_source}
          type="url"
          onChange={e => setPrint({ ...print, stl_source: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <FormGroup>
          <FormControlLabel  label="Raft?" control={
            <Switch
              id="raft-input"
              checked={needs_raft}
              onChange={e => setPrint({ ...print, needs_raft: e.target.value})}
            />}
          />
        </FormGroup>          
      </FormControl>
      <FormControl>
        <FormGroup>
          <FormControlLabel  label="Supports?" control={
            <Switch
              id="supports-input"
              checked={needs_supports}
              onChange={e => setPrint({ ...print, needs_supports: e.target.value})}
            />}
          />
        </FormGroup>          
      </FormControl>
      <FormControl>
        <TextField
          label="Issues"
          variant="outlined"
          id="issues-input"
          placeholder="Any issues?"
          value={issues}
          multiline
          rows={5}
          onChange={e => setPrint({ ...print, issues: e.target.value})}
        />
      </FormControl>      
      <Button onClick={createPrint}>Create Print</Button>
    </Box>
  );
}

export default AddPrint;