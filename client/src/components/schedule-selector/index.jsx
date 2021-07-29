import React, { useState } from 'react';
import {
	Typography,
	Button,
	Modal,
	makeStyles,
	createStyles,
	TextField,
	Radio,
} from '@material-ui/core';
import Cron from 'react-cron-generator';
import 'react-cron-generator/dist/cron-builder.css';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
			fontSize: theme.spacing(3.5),
			fontStyle: 'italic',
		},
		spacer: {
			margin: '0 25.25ch',
		},
	})
);

/**
 *
 * @param {object} props
 * @param {string} props.recurringValue
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setRecurringValue
 * @param {Date} props.dateTimeValue
 * @param {React.Dispatch<React.SetStateAction<Date>>} props.setDateTimeValue
 * @param {number} props.optionSelected
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setOptionSelected
 * @returns {import('react').ReactNode}
 */
export default function RecurringScheduleSelector({
	recurringValue,
	setRecurringValue,
	dateTimeValue,
	setDateTimeValue,
	optionSelected,
	setOptionSelected,
}) {
	const [openRecurring, setOpenRecurring] = useState(false);
	const changeOption = event => {
		setOptionSelected(+event.target.value);
	};

	const classes = useStyles();

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<>
				<Radio onChange={changeOption} checked={optionSelected === 1} value={1} />
				<TextField
					disabled={optionSelected !== 1}
					value={recurringValue}
					variant="outlined"
					label="Recurring Schedule"
					onClick={() => setOpenRecurring(true)}
				/>
				<Modal
					open={openRecurring}
					className={classes.modal}
					onClose={() => setOpenRecurring(false)}
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
							showResultCron={true}
						/>
						<Button
							color="primary"
							variant="contained"
							style={{ marginTop: '1rem' }}
							onClick={() => setOpenRecurring(false)}>
							Okay
						</Button>
					</div>
				</Modal>
				<span className={classes.spacer} />
				<Radio onChange={changeOption} checked={optionSelected === 2} value={2} />
				<DateTimePicker
					label="Immediate Schedule"
					inputVariant="outlined"
					value={dateTimeValue}
					onChange={setDateTimeValue}
					disabled={optionSelected !== 2}
				/>
			</>
		</MuiPickersUtilsProvider>
	);
}
