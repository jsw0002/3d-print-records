import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function RecentPrints(props) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const printArray = [];
    props.prints.map(p => {
      const { name, material_cost, filament_length, printing_time, project, quantity } = p;
      printArray.push({ name, material_cost, filament_length, printing_time, project, quantity });
      return p;
    });
    setRows(printArray);
  }, [props.prints]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Prints
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Length Used</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{`$${(row.material_cost/100).toFixed(2)}`}</TableCell>
              <TableCell>{`${row.filament_length/100}m`}</TableCell>
              <TableCell>{`${Math.floor(row.printing_time/60)}h ${row.printing_time%60}m`}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right" onClick={() => navigate(`/projects/${row.project}`)}>Project</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}