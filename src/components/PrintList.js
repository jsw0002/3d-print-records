import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddPrint from './AddPrint';
import Card from './Card';
import Grid from '@mui/material/Grid';

function PrintList() {
  const [prints, setPrints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  
  useEffect(() => {
    fetchPrints();
  }, [])

  async function fetchPrints() {
    const { data } = await supabase
      .from('prints')
      .select();
    setPrints(data);
    console.log('print data: ', data);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Grid container spacing={2}>
        {
          prints.map(p => (
            <Grid item xs={3}>
              <Card key={p.id} print={p} />
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
          <AddPrint />
        </Box>
      </Modal>
    </>
  );
}

export default PrintList;