import React, { useState } from 'react';
import { Typography, Button, Modal, makeStyles, createStyles } from '@material-ui/core';
import Cron from 'react-cron-generator';
import 'react-cron-generator/dist/cron-builder.css';

const useStyles = makeStyles(theme =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			width: theme.spacing(100),
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		text: {
			fontWeight: 'bold',
			fontSize: theme.spacing(4),
		},
	})
);

/**
 *
 * @param {object} props
 * @param {string} props.recurringValue
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setRecurringValue
 * @returns {import('react').ReactNode}
 */
export default function RecurringScheduleSelector({ recurringValue, setRecurringValue }) {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	return (
		<>
			<Button color="primary" onClick={() => setOpen(true)}>
				Select Recurring Schedule
			</Button>
			<Modal
				open={open}
				className={classes.modal}
				onClose={() => setOpen(false)}
				aria-labelledby="recurring-modal-title"
				aria-describedby="recurring-modal-description">
				<div className={classes.paper}>
					<Typography gutterBottom className={classes.text}>
						Select a Recurring Schedule
					</Typography>
					<Cron
						onChange={e => setRecurringValue(e)}
						value={recurringValue}
						showResultText={true}
						showResultCron={false}
					/>
				</div>
			</Modal>
		</>
	);
}
