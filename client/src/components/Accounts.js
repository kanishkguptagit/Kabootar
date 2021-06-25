import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import accountsStyles from "../styles/Accounts";

export default function Accounts(props) {
  const classes = accountsStyles();

  return (
    <Grid container component="main" className={classes.root}>      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="/logos/icon.png"></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {props.items.map((item) => {
              return (<TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={item.id}
                label={item.label}
                name={item.name}
                autoFocus={item.autofocus}
                type={item.type}
              />);
            })}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.action}
            </Button>
            {props.action === "sign in" && (
              <Grid container>
                <Grid item xs justify="left">
                  <Link to="#" variant="body2">
                    {"Forgot password?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            )}
            {props.action === "sign up" && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </div>
            )}
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
