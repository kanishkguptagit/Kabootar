import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

import { mainListItems, secondaryListItems } from './dashboard/listItems';
// import Chart from '../components/dashboard/Chart';
import Deposits from './dashboard/Deposits';
import Orders from './dashboard/Orders';
import layoutStyles from '../styles/Layout';
import DraftEditorApp from './draft/DraftEditor';
import TextFields from './TextField';
import AuthContext from '../store/auth-context';
import Chart from './dashboard/Chart';

export default function Layout(props) {
	const classes = layoutStyles();
	const ctx = useContext(AuthContext);
	const history = useHistory();

	const [editorContentValue, setEditorContentValue] = useState('');
	const [toField, setToField] = useState('');
	const [subjectField, setSubjectField] = useState('');
	const [selectVar, setSelectVar] = useState('none');

	const chart = props.chart ?? false;
	const block = props.block ?? false;
	const list = props.list ?? false;
	const editor = props.editor ?? false;

	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const logoutHandler = () => {
		ctx.logout();
		history.replace('/');
	};

	const toChangeHandler = event => {
		setToField(event.target.value);
	};

	const subjectChangeHandler = event => {
		setSubjectField(event.target.value);
	};

	const selectChangeHandler = event => {
		setSelectVar(event.target.value);
	}

	const submitForm = event => {
		event.preventDefault();

		props.getEnteredValues(toField, subjectField, editorContentValue, selectVar);
	};

	const editorContentHandler = mailContent => {
		setEditorContentValue(mailContent);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
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
						{/* Chart */}
						{chart && (
							<Grid item xs={12} md={8} lg={9}>
								<Paper className={fixedHeightPaper}><Chart /></Paper>
							</Grid>
						)}

						{/* Recent Deposits */}
						{block && (
							<Grid item xs={12} md={4} lg={3}>
								<Paper className={fixedHeightPaper}>
									<Deposits detail={props.block.detail} />
								</Paper>
							</Grid>
						)}

						{/* Recent Orders */}
						{list && (
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<Orders item={props.list.items} />
								</Paper>
							</Grid>
						)}

						{/* Editor */}
						{editor && (
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<form onSubmit={submitForm}>
										<div className={classes.select}>
											<InputLabel id="schedule">
												Schedule
											</InputLabel>
											<Select
												labelId="schedule"
												id="schedule"
												  value={selectVar}
												  onChange={selectChangeHandler}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value={'one day'}>One Day</MenuItem>
												<MenuItem value={'one week'}>One Week</MenuItem>
												<MenuItem value={'one month'}>One Month</MenuItem>
												<MenuItem value={'one year'}>One Year</MenuItem>
											</Select>
										</div>
										<TextFields
											label={'To'}
											autoFocus={true}
											onChange={toChangeHandler}
										/>
										<TextFields
											label={'Subject'}
											onChange={subjectChangeHandler}
										/>
										<DraftEditorApp editorContent={editorContentHandler} />
										<div className={classes.sendButton}>
											<Button
												variant="contained"
												color="primary"
												size="medium"
												type="submit"
												style={{ textTransform: 'none' }}
												onClick={submitForm}>
												Send Mail
											</Button>
										</div>
									</form>
								</Paper>
							</Grid>
						)}
					</Grid>
				</Container>
			</main>
		</div>
	);
}
