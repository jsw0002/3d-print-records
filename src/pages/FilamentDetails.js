import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Box from '@mui/material/Box';
import Chart from '../components/Chart';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RecentPrints from '../components/RecentPrints';

function FilamentDetails() {
  const { id } = useParams();
  const [filament, setFilament] = useState({});
  const [printData, setPrintData] = useState([]);
  const { type, color, weight, img_url, brand } = filament;
  
  async function fetchFilamentDetails() {
    const { data } = await supabase
      .from('filaments')
      .select(`
        *,
        prints (*)
      `)
      .eq('id', id);
    setFilament(data[0]);
  }

  useEffect(() => {
    fetchFilamentDetails();
  }, []);

  useEffect(async () => {
    const prints = filament.hasOwnProperty('prints');
    if (prints) {
      const array = [];
      await Promise.all(filament.prints.map(async p => {
        const { data: project } = await supabase
          .from('projects')
          .select('quantity')
          .eq('id', p.project);
        if (project[0].quantity > 1) {
          for (let i = 0; i < project[0].quantity; i++) array.push(p);
        } else {
          array.push(p);
        }
      }))
      setPrintData(array);
    }
  }, [filament])

  return (
    <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart prints={printData} />
            </Paper>
          </Grid>
          {/* Image */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <img src={img_url} alt={`${brand} ${color} ${type} filament - ${weight/1000}kg`} className='max-h-48' />
            </Paper>
          </Grid>
          {/* Recent Prints */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <RecentPrints prints={printData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default FilamentDetails