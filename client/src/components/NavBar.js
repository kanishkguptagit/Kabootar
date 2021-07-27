import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import NavStyles from '../styles/NavBar';
import AuthContext from '../store/auth-context';

export default function NavBar() {
	const classes = NavStyles();
	const ctx = useContext(AuthContext);

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						kabootar
					</Typography>
					{!ctx.isLoggedIn && (
						<NavLink to="/signin" className={classes.links}>
							Login
						</NavLink>
					)}
					{ctx.isLoggedIn && (
						<NavLink to="/dashboard" className={classes.links}>
							Dashboard
						</NavLink>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
