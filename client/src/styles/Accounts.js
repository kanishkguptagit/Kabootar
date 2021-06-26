import { makeStyles } from '@material-ui/core/styles';

const accountsStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage:
			'url(https://source.unsplash.com/G_lwAp0TF38/1800x1800),url(https://source.unsplash.com/G_lwAp0TF38/300x300)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		height: '75px',
		width: '75px',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: '60px',
	},
}));

export default accountsStyles;
