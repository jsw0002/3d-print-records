import Grid from '@mui/material/Grid';

function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <div className='text-xl sm:text-3xl md:text-5xl lg:text-7xl
          mt-5 md:mt-10 lg:mt-15 xl:mt-20 
          ml-5 sm:ml-10 md:ml-20 lg:ml-30 xl:ml-40
        '>
          This is a record of all projects I've created using my Flashforge Adventurer 4 3D printer.
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <img
          className='mx-auto align-middle bg-transparent'
          src="/images/flashforge-adventurer-4.jpg"
          alt='Flashforge Adventurer 4 3D Printer'
        />
      </Grid>
    </Grid>
  )
}

export default Home