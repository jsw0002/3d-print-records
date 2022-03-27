import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddFilament from './AddFilament';
import Card from './Card';
import Grid from '@mui/material/Grid';

function FilamentList() {
  const [filaments, setFilaments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  
  useEffect(() => {
    fetchFilaments();
  }, [])

  async function fetchFilaments() {
    const { data } = await supabase
      .from('filaments')
      .select();
    setFilaments(data);
    console.log('filament data: ', data);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Grid container spacing={2}>
        {
          filaments.map(f => (
            <Grid item xs={3}>
              <Card key={f.id} filament={f} />
            </Grid>
          ))
        }
      </Grid>
      <Button onClick={toggleModal}>Open Modal</Button>
      <Modal
        open={showModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddFilament />
        </Box>
      </Modal>
    </>
  );
}

export default FilamentList;