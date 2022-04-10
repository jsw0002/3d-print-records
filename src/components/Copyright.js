import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const Copyright = () => {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{marginTop: "25px"}}>
        {'Copyright ©'}
        <Link to="https://3d-print-records.vercel.app/">
          &nbsp;JDubya's 3D Print Records&nbsp;
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Stack>
    );
  }

  export default Copyright