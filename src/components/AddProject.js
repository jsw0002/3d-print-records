import { useState } from 'react';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function AddProject(props) {
  const projectStarter = { name: '', img_url: '', stl_source: '' };
  const [project, setProject] = useState(projectStarter);
  const { name, img_url, stl_source } = project;

  async function createProject() {
    await supabase 
      .from('projects')
      .insert([
        { name, img_url, stl_source }
      ])
      .single();
    setProject(projectStarter);
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
      <h1>Add a Project</h1>
      <FormControl>
        <TextField
          label="Name"
          required
          variant="outlined"
          id="name-input"
          placeholder="Name"
          value={name}
          type="text"
          onChange={e => setProject({ ...project, name: e.target.value })}
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
          onChange={e => setProject({ ...project, img_url: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="STL Source"
          required
          variant="outlined"
          id="stl-input"
          placeholder="STL Source"
          value={stl_source}
          type="url"
          onChange={e => setProject({ ...project, stl_source: e.target.value })}
        />
      </FormControl>
      <Button onClick={createProject}>Create Project</Button>
    </Box>
  );
}

export default AddProject;