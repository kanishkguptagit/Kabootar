import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//drawer
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { mainListItems, secondaryListItems } from './dashboard/listItems';

//appbar
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';

import AuthContext from '../store/auth-context';

import layoutStyles from '../styles/Layout';
// import DrawerComponent from './DrawerComponent';
// import AppBarComponent from './AppBarComponent';

export default function Layout(props) {
	const classes = layoutStyles();

	const ctx = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		ctx.logout();
		history.replace('/');
	};

	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			{/* <AppBarComponent handleDrawerOpen={handleDrawerOpen} open={open} title={props.title} /> */}
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							props.open && classes.menuButtonHidden
						)}>
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

			{/* <DrawerComponent handleDrawerClose={handleDrawerClose} open={open}/> */}
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>

			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{props.children}
					</Grid>
				</Container>
			</main>
		</div>
	);
}
