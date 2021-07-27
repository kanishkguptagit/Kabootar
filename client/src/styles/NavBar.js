import { makeStyles } from '@material-ui/core/styles';

const NavStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	links: {
		padding: '0% 1%',
		color: 'white',
		textDecoration: 'none',
		'&:hover': {
			color: '#bbbfbc',
		},
	},
}));

export default NavStyles;
