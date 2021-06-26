import React from 'react';
<<<<<<< HEAD
=======
import Link from '@material-ui/core/Link';
>>>>>>> main
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

<<<<<<< HEAD
// function preventDefault(event) {
//   event.preventDefault();
// }
=======
function preventDefault(event) {
  event.preventDefault();
}
>>>>>>> main

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Mails</Title>
      <Typography component="p" variant="h4">
        100
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>      
    </React.Fragment>
  );
}
