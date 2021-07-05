import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';


export default function Orders(props) {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Mails</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Scheduled</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Subject</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.item.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.scheduled}</TableCell>               */}
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
