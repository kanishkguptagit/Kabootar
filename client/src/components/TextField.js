import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '98%',
			paddingBottom: '1%',
		},
	},
}));

export default function TextFields(props) {
	const classes = useStyles();

	const inputRef = props.ref ?? null;

	return (
		<div className={classes.root}>
			<TextField
				id="outlined-basic"
				label={props.label}
				variant="outlined"
				autoFocus={props.autoFocus}
				inputRef={inputRef}
				onChange={props.onChange}
			/>
		</div>
	);
}
