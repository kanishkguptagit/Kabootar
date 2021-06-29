import { Fragment, useContext, useState } from 'react';
import { Snackbar, Chip } from '@material-ui/core';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';

function Create() {
	const [message, setMessage] = useState('');
	const ctx = useContext(AuthContext);

	const getEnteredValues = async (to, subject, body) => {
		const toArray = to?.split(',').map(t => t.trim());

		const data = await fetch('https://kabootar-mail.herokuapp.com/mails/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + ctx.token,
			},
			body: JSON.stringify({
				to: toArray,
				subject,
				body,
				// isScheduled:true,
				// scheduled: new Date().toISOString()
			}),
		}).then(res => res.json());

		console.log('the data was', data);

		if (data && data.success) {
			setMessage('Your mail will be delived by us!');
		} else {
			setMessage(data.result ?? 'The Mail Could not be sent.');
		}
	};

	return (
		<Fragment>
			<Layout editor={true} title={'Create'} getEnteredValues={getEnteredValues} />
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
		</Fragment>
	);
}

export default Create;
