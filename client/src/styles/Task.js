import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	containerBox: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		textAlign: 'center',
		margin: '3%',
	},
	text: {
		flexShrink: 1,
		marginRight: '1%',
		width: '100%',
	},
	add: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		float: 'right',
	},
	button: {
		height: '100%',
		width: '',
	},
});

export default useStyles;
