import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { blue } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPrint from './AddPrint';
import Box from '@mui/material/Box';
import Card from './Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

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
      .from("prints")
      .select();
    setPrints(data);
  }

  function testAlert(print) {
    console.log("this worked, I think", print);
    alert("Hello World");
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
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
    <>
      <Grid container spacing={2}>
        {
          prints.map(p => (
            <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card print={p} filament={{}} action={testAlert} />
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