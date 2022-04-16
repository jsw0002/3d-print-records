import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { blue } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddProject from '../components/AddProject';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const hideModal = () => {
    setShowModal(false);
    setTriggerFetch(!triggerFetch);
  };

  useEffect(() => {
    fetchProjects();
  }, [triggerFetch]);

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select();
    setProjects(data);
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
    <Container>
      <Box sx={{ display: { xl: 'none' }}} >
        <Typography mt={1} mb={1} textAlign='center' variant='h4'>
          Completed Projects
        </Typography>
        <ImageList variant='masonry' cols={2} gap={4}>
          {
            projects.map(p => (
              <ImageListItem key={p.id}>
                <img
                  src={p.img_url}
                  alt={p.name}
                  loading='lazy'
                />
                <ImageListItemBar
                  title={p.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${p.name}`}
                      onClick={() => navigate(`/projects/${p.id}`, {state: p })}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }}}>
        <Typography mb={2} mt={2} textAlign='center' variant='h2'>
          Completed Projects
        </Typography>
        <ImageList variant='masonry' cols={4} gap={4}>
          {
            projects.map(p => (
              <ImageListItem key={p.id}>
                <img
                  src={p.img_url}
                  alt={p.name}
                  loading='lazy'
                />
                <ImageListItemBar
                  title={p.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${p.name}`}
                      onClick={() => navigate(`/projects/${p.id}`)}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Box>
      <IconButton sx={buttonStyle} aria-label="open-modal" onClick={openModal}>
        <AddCircleIcon sx={iconStyle} />
      </IconButton>
      <Modal
        open={showModal}
        onClose={hideModal}
        aria-labelledby="modal-add-project"
        aria-describedby="modal-form-to-add-project"
      >
        <Box sx={style}>
          <AddProject hideModal={hideModal} />
        </Box>
      </Modal>
    </Container>
  )
}

export default ProjectList