import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import Schedule from '@material-ui/icons/Schedule';
import List from '@material-ui/icons/List';
import AssignmentIcon from '@material-ui/icons/Assignment';

import classes from '../../styles/listItems.module.css';

export const mainListItems = (
	<div>
		<NavLink to="/dashboard" className={classes.navlink} activeStyle={{ color: '#3f5acc' }}>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
		</NavLink>
		<NavLink to="/create" className={classes.navlink} activeStyle={{ color: '#3f5acc' }}>
			<ListItem button>
				<ListItemIcon>
					<CreateIcon />
				</ListItemIcon>
				<ListItemText primary="Compose" />
			</ListItem>
		</NavLink>
		<NavLink to="/history" className={classes.navlink} activeStyle={{ color: '#3f5acc' }}>
			<ListItem button>
				<ListItemIcon>
					<Schedule />
				</ListItemIcon>
				<ListItemText primary="Ongoing" />
			</ListItem>
		</NavLink>
		<NavLink to="/task" className={classes.navlink} activeStyle={{ color: '#3f5acc' }}>
			<ListItem button>
				<ListItemIcon>
					<List />
				</ListItemIcon>
				<ListItemText primary="Task" />
			</ListItem>
		</NavLink>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Filter by</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end" />
		</ListItem>
	</div>
);
