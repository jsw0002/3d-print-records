import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { blue } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddFilament from '../components/AddFilament';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FilamentCard from '../components/FilamentCard';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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
      .from("filaments")
      .select();
    setFilaments(data);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    position: "fixed",
    right: 25,
    bottom: 25,
  };

  const iconStyle = {
    fontSize: "72px",
    color: blue[500],
  };

  return (
    <Container>
      <Typography mt={1} mb={1} textAlign='center' variant='h4'>
        Filaments
      </Typography>
      <Grid container spacing={2}>
        {
          filaments.map(f => (
            <Grid key={f.id} item xs={12} sm={6} md={4} lg={3}>
              <FilamentCard filament={f} />
            </Grid>
          ))
        }
      </Grid>
      <IconButton sx={buttonStyle} aria-label="open-modal" onClick={openModal}>
        <AddCircleIcon sx={iconStyle} />
      </IconButton>
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
    </Container>
  );
}

export default FilamentList;