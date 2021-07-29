import { useContext, useState } from 'react';
import { Snackbar, Chip } from '@material-ui/core';

import Layout from '../components/Layout';
import Editor from '../components/Editor';
import AuthContext from '../store/auth-context';

function Create() {
	const [message, setMessage] = useState('');
	const ctx = useContext(AuthContext);

	const getEnteredValues = async (
		to,
		subject,
		body,
		optionSelected,
		recurringSchedule,
		onceSchedule
	) => {
		const toArray = to?.split(',').map(t => t.trim());
		const withBodyTag = `<body> ${body} </body>`;

		const isRecurring = optionSelected === 1;
		const isScheduled = optionSelected === 2;
		const scheduled = isRecurring
			? recurringSchedule
			: isScheduled
			? onceSchedule.toISOString()
			: '';

		const requestBody = JSON.stringify({
			to: toArray,
			subject,
			body: withBodyTag,
			isRecurring,
			isScheduled,
			scheduled,
		});

		console.log(requestBody);

		const data = await fetch(process.env.REACT_APP_BACKEND + '/mails/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + ctx.token,
			},
			body: requestBody,
		}).then(res => res.json());

		if (data && data.success) {
			setMessage('Your mail will be delived by us!');
		} else {
			setMessage(data.result ?? 'The Mail Could not be sent.');
		}
	};

	return (
		<>
			<Layout title={'Compose'}>
				<Editor getEnteredValues={getEnteredValues} />
			</Layout>
			<Snackbar
				open={message.length > 0}
				autoHideDuration={4000}
				onClose={() => setMessage('')}>
				<Chip
					color="primary"
					size="medium"
					onDelete={() => setMessage('')}
					label={message}
				/>
			</Snackbar>
		</>
	);
}

export default Create;
