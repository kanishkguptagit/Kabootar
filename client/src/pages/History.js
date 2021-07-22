import { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import { Button } from '@material-ui/core';
import Modal from '../ui/Modal';

function createData(id, date, schedule, recipient, subject) {
	return { id, date, schedule, recipient, subject };
}

function History() {
	const ctx = useContext(AuthContext);

	const [openModal,setOpenModal] = useState(false);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const modalHandler = () => {
		setOpenModal(prevState => {
			return !prevState;
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('https://kabootar-mail.herokuapp.com/mails/history', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			const results = (data.result || []).map(res =>
				createData(res._id, '', res.scheduled, res.recipents?.toString(), res.subject)
			);

			setLoadedData({ enable: true, items: results });
		};

		fetchData();
	}, [ctx.token]);

	return (
		<Layout title={'History'}>
			{ openModal && <Modal onClose={modalHandler} /> }
			<MailList items={loadedData.items}>
				<Button
					onClick={modalHandler}
					size="x-small"
					variant="outlined"
					color="primary"
					style={{ textTransform: 'none', maxWidth:'90px', maxHeight:'35px' }}>
					analytics
				</Button>
			</MailList>
		</Layout>
	);
}

export default History;
