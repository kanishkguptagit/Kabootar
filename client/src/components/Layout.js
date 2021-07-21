import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import layoutStyles from '../styles/Layout';
import DrawerComponent from "./DrawerComponent";
import AppBarComponent from "./AppBarComponent";

export default function Layout(props) {
	const classes = layoutStyles();

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
			<AppBarComponent handleDrawerOpen={handleDrawerOpen} open={open} title={props.title} />
			<DrawerComponent handleDrawerClose={handleDrawerClose} open={open}/>
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
