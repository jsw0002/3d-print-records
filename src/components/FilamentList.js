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
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const hideModal = () => {
    setShowModal(false);
    setTriggerFetch(!triggerFetch);
  };
  
  useEffect(() => {
    fetchFilaments();
  }, [triggerFetch])

  async function fetchFilaments() {
    const { data } = await supabase
      .from('filaments')
      .select();
    setFilaments(data);
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
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card key={f.id} filament={f} print={false} />
            </Grid>
          ))
        }
      </Grid>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        open={showModal}
        onClose={hideModal}
        aria-labelledby="modal-add-filament"
        aria-describedby="modal-form-to-add-filament"
      >
        <Box sx={style}>
          <AddFilament toggleModal={hideModal} />
        </Box>
      </Modal>
    </>
  );
}

export default FilamentList;