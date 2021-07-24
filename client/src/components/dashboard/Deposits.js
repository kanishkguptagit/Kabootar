import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Mails</Title>
      <Typography component="p" variant="h4">
        {props.items}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {props.date}
      </Typography>      
    </React.Fragment>
  );
}
