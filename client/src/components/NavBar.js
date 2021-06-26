import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

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
					<NavLink to="#" className={classes.links}>Contact</NavLink>
					<NavLink to="/signin" className={classes.links}>Login</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
}
