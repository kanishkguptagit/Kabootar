import React from 'react';
<<<<<<< HEAD
// import { makeStyles } from '@material-ui/core/styles';
=======
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
>>>>>>> main
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, schedule, recipient, subject ) {
  return { id, date, schedule, recipient, subject };
}

const rows = [
  createData(0, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Mitra being Mitra with his chutiyap'),
  createData(1, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(2, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(3, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(4, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
];

<<<<<<< HEAD
// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function Orders() {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Mails</Title>
=======
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Mails</Title>
>>>>>>> main
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Scheduled</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Subject</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.schedule}</TableCell>
              <TableCell>{row.recipient}</TableCell>
              <TableCell>{row.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
