import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import { blue } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPrint from '../components/AddPrint';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const hideModal = () => {
    setShowModal(false);
    setTriggerFetch(!triggerFetch);
  };

  async function fetchProjectDetails() {
    const { data } = await supabase
      .from('projects')
      .select(`
        *,
        prints (*)
      `)
      .eq('id', id);
    setProject(data[0]);
    console.log('project: ', project);
    console.log('data: ', data);
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [triggerFetch]);

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
      <h1>{`ProjectDetails for id: ${id}`}</h1>
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
          <AddPrint hideModal={hideModal} project={id} />
        </Box>
      </Modal>
    </>
  )
}

export default ProjectDetails