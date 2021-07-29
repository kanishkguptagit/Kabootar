import { useEffect, useContext, useState } from 'react';
import { Button } from '@material-ui/core';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import Modal from '../ui/Modal';
import Analytics from '../components/Analytics';

function createData(id, schedule, recipient, subject, recipientSummary) {
	const scheduleDate = new Date(schedule);
	const month = scheduleDate.toDateString();
	const time = scheduleDate.toLocaleTimeString();
	schedule = month + ' - ' + time;
	return { id, schedule, recipient, subject, recipientSummary };
}

function History() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [loading, setLoading] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	const [mailId, setMailId] = useState('');

	const modalHandler = mailId => {
		setMailId(mailId);
		setOpenModal(prevState => {
			return !prevState;
		});
	};

	const deleteHandler = mailId => {
		fetch(process.env.REACT_APP_BACKEND + '/mails/cancel/' + mailId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + ctx.token,
			},
		})
			.then(() =>
				setLoadedData(prevData => ({
					enabled: prevData.enable,
					items: prevData.items.filter(({ id }) => id !== mailId),
				}))
			)
			.catch(e => console.log('while deleting ', e));
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const response = await fetch(process.env.REACT_APP_BACKEND + '/mails/dashboard', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			});

			const data = await response.json();

			const results = (data.result || []).map(res =>
				createData(
					res._id,
					res.scheduled,
					res.recipents.slice(1, res.recipents.length),
					res.subject,
					res.recipents[0]
				)
			);

			setLoadedData({ enable: true, items: results });
			setLoading(false);
		};

		fetchData();
	}, [ctx.token, setLoadedData, setLoading]);

	return (
		<Layout title="Ongoing">
			{openModal && (
				<Modal onClose={modalHandler}>
					<Analytics mailId={mailId} ctx={ctx} />
				</Modal>
			)}
			{!loading && (
				<MailList
					items={loadedData.items}
					modalHandler={modalHandler}
					childOperation={deleteHandler}
					column="Delete">
					<Button
						onClick={deleteHandler}
						size="x-small"
						variant="outlined"
						color="secondary"
						style={{
							textTransform: 'none',
							maxWidth: '90px',
							maxHeight: '35px',
						}}>
						Delete
					</Button>
				</MailList>
			)}
			{loading && (
				<div className="centered">
					<LoadingSpinner />
				</div>
			)}
		</Layout>
	);
}

export default History;
