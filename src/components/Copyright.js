import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const Copyright = () => {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{marginTop: "25px"}}>
        {'Copyright © '}
        <Link color="inherit" href="https://3d-print-records.vercel.app/">
          3d-print-records
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Stack>
    );
  }

  export default Copyright