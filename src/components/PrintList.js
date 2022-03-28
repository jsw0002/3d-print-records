import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddPrint from './AddPrint';
import Card from './Card';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { blue } from "@mui/material/colors";

function PrintList() {
  const [prints, setPrints] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const hideModal = () => {
    setShowModal(false);
    setTriggerFetch(!triggerFetch);
  };
  
  useEffect(() => {
    fetchPrints();
  }, [triggerFetch])

  async function fetchPrints() {
    const { data } = await supabase
      .from('prints')
      .select();
    setPrints(data);
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
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card key={p.id} print={p} filament={{}} />
            </Grid>
          ))
        }
      </Grid>
      <IconButton sx={{bgcolor: blue[500]}} aria-label="open-modal" onClick={openModal}>
        <AddCircleIcon />
      </IconButton>
      <Modal
        open={showModal}
        onClose={hideModal}
        aria-labelledby="modal-add-print"
        aria-describedby="modal-form-to-add-print"
      >
        <Box sx={style}>
          <AddPrint hideModal={hideModal} />
        </Box>
      </Modal>
    </>
  );
}

export default PrintList;