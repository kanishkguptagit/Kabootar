import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NavStyles from '../styles/NavBar';

export default function NavBar() {
	const classes = NavStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						kabootar
					</Typography>
					<Button color="inherit">Contact</Button>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
