import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import { blue } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPrint from '../components/AddPrint';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import PrintCard from '../components/PrintCard';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [prints, setPrints] = useState([]);
  const [projectCost, setProjectCost] = useState(0);
  const [projectLength, setProjectLength] = useState(0);
  const [projectTime, setProjectTime] = useState(0);
  const [numOfPrints, setNumOfPrints] = useState(0);
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
  }

  function sumProjectData() {
    if (Object.entries(project).length > 0) {
      const { prints } = project;
      setPrints(prints);
      let cost = 0;
      let length = 0;
      let time = 0;
      let num = 0;
      prints.map((p) => {
        num += p.quantity;
        cost += p.material_cost * p.quantity;
        length += p.filament_length * p.quantity;
        time += p.printing_time * p.quantity;
        return p;
      })
      setProjectCost(cost/100);
      setProjectLength(length/100);
      setProjectTime(time);
      setNumOfPrints(num);
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [triggerFetch]);

  useEffect(() => {
    sumProjectData();
  }, [project])

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
      <Paper elevation={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <div className='ml-10'>
              <p className='text-4xl font-bold mt-3 md:text-6xl md:mt-6'>{project.name}</p>
              <p className='text-2xl my-3'>Total Cost: ${projectCost}</p>
              <p className='text-2xl my-3'>Total Length: {projectLength}m</p>
              <p className='text-2xl my-3'>Total Print Time: {Math.floor(projectTime/60)}h {projectTime % 60}m</p>
              <p className='text-2xl my-3'>Total Prints: {numOfPrints}</p>
              <span className='my-4'>
                <Button startIcon={<InsertDriveFileIcon />} variant='contained' href={project.stl_source} target="_blank" sx={{ fontWeight: "bold" }} disabled={!project.stl_source}>STL File</Button>
              </span>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <img src={project.img_url} alt={project.name} />
          </Grid>
        </Grid>
      </Paper>
      <Grid mt={{ xs: 1, md: 2, xl: 6 }} container spacing={2}>
        {
          prints.map((p, index) => (
            <Grid key={index} item xs={12} md={4} xl={3}>
              <PrintCard print={p} />
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
          <AddPrint hideModal={hideModal} project={id} />
        </Box>
      </Modal>
    </Container>
  );
}

export default ProjectDetails