import { useEffect, useContext, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';

function createData(id, schedule, recipient, subject) {
	return { id, schedule, recipient, subject };
}

const chart = {
	enable: true,
};

const block = {
	enable: true,
	details: null,
};

function Dashboard() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('https://kabootar-mail.herokuapp.com/mails/dashboard', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			const results = (data.result || []).map(res =>
				createData(res._id, res.scheduled, res.recipents?.toString(), res.subject)
			);

			setLoadedData({ enable: true, items: results });
		};

		fetchData();
	}, [ctx.token, setLoadedData]);

	return (
		<Layout editor={false} chart={chart} block={block} list={loadedData} title={'Dashboard'} />
	);
}

export default Dashboard;
