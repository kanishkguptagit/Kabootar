import clsx from 'clsx';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import AuthContext from '../store/auth-context';
import layoutStyles from '../styles/Layout';

export default function AppBarComponent(props) {
	const classes = layoutStyles();
	const ctx = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		ctx.logout();
		history.replace('/');
	};

	return (
		<AppBar
			position="absolute"
			className={clsx(classes.appBar, props.open && classes.appBarShift)}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={props.handleDrawerOpen}
					className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}>
					<MenuIcon />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					className={classes.title}>
					{props.title}
				</Typography>
				<Button
					variant="text"
					color="primary"
					size="medium"
					onClick={logoutHandler}
					style={{ textTransform: 'none', color: 'white' }}>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
}
