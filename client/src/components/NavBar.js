import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import NavStyles from '../styles/NavBar';

export default function NavBar() {
  const classes = NavStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
					<Typography variant="h6" className={classes.title}>
						Kabootar
					</Typography>
					<Button color="inherit">Contact</Button>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
