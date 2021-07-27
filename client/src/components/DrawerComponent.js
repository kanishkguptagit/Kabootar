import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { mainListItems, secondaryListItems } from './dashboard/listItems';
import layoutStyles from '../styles/Layout';

export default function DrawerComponent(props) {
	const classes = layoutStyles();

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
			}}
			open={props.open}>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={props.handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>{mainListItems}</List>
			<Divider />
			<List>{secondaryListItems}</List>
		</Drawer>
	);
}
