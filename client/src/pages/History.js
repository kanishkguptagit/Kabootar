import { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import Modal from '../ui/Modal';
import Analytics from '../components/Analytics';

function createData(id, date, schedule, recipient, subject, recipientSummary) {
	return { id, date, schedule, recipient, subject,recipientSummary };
}

function History() {
	const ctx = useContext(AuthContext);

	const [openModal, setOpenModal] = useState(false);
	const [mailId, setMailId] = useState('');

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const modalHandler = mailId => {
		setMailId(mailId);
		setOpenModal(prevState => {
			return !prevState;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			const url = process.env.REACT_APP_BACKEND + '/mails/history';
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			const results = (data.result || []).map(res =>
				createData(res._id, '', res.scheduled, res.recipents, res.subject, res.recipents[0])
			);

			setLoadedData({ enable: true, items: results });
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
			<MailList items={loadedData.items} history={true} modalHandler={modalHandler} />
		</Layout>
	);
}

export default History;
