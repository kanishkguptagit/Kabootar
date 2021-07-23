import { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import Modal from '../ui/Modal';
import Analytics from '../components/Analytics';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

function createData(id, date, schedule, recipient, subject, recipientSummary) {
	const scheduleDate = new Date(schedule);
	const month = scheduleDate.toDateString();
	const time = scheduleDate.toLocaleTimeString();
	schedule = month + ' - ' + time;
	return { id, date, schedule, recipient, subject, recipientSummary };
}

function History() {
	const ctx = useContext(AuthContext);

	const [openModal, setOpenModal] = useState(false);
	const [mailId, setMailId] = useState('');

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [loading, setLoading] = useState(false);

	const modalHandler = mailId => {
		setMailId(mailId);
		setOpenModal(prevState => {
			return !prevState;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const url = process.env.REACT_APP_BACKEND + '/mails/history';
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			const results = (data.result || []).map(res =>
				createData(
					res._id,
					'',
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
	}, [ctx.token]);

	return (
		<Layout title={'History'}>
			{openModal && (
				<Modal onClose={modalHandler}>
					<Analytics mailId={mailId} ctx={ctx} />
				</Modal>
			)}
			{!loading && (
				<MailList items={loadedData.items} history={true} modalHandler={modalHandler} />
			)}
			{loading && <div className="centered"><LoadingSpinner /></div>}
		</Layout>
	);
}

export default History;
