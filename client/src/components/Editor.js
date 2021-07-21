import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TextFields from './TextField';
import Button from '@material-ui/core/Button';
import layoutStyles from '../styles/Layout';
import DraftEditorApp from './draft/DraftEditor';
import RecurringScheduleSelector from './schedule-selector/recurring';

export default function Editor(props) {
	const classes = layoutStyles();

	const [editorContentValue, setEditorContentValue] = useState('');
	const [toField, setToField] = useState('');
	const [subjectField, setSubjectField] = useState('');
	const [recurringValue, setRecurringValue] = useState('');
	const [dateTimeValue, setDateTimeValue] = useState('');

	const toChangeHandler = event => {
		setToField(event.target.value);
	};

	const subjectChangeHandler = event => {
		setSubjectField(event.target.value);
	};

	const submitForm = event => {
		event.preventDefault();

		props.getEnteredValues(toField, subjectField, editorContentValue, recurringValue, dateTimeValue);
	};

	const editorContentHandler = mailContent => {
		setEditorContentValue(mailContent);
	};

	return (
		<Grid item xs={12}>
			<Paper className={classes.paper}>
				<form onSubmit={submitForm}>
					<RecurringScheduleSelector
						recurringValue={recurringValue}
						setRecurringValue={setRecurringValue}
					/>

					<div className={classes.select}>
						<TextField
							label="Once Schedule"
							type="datetime-local"
							className={classes.dateTimeField}
							InputLabelProps={{
								shrink: true,
							}}
							value={dateTimeValue}
							onChange={e => setDateTimeValue(e.target.value)}
						/>
					</div>
					<TextFields label={'To'} autoFocus={true} onChange={toChangeHandler} />
					<TextFields label={'Subject'} onChange={subjectChangeHandler} />
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
	);
}
