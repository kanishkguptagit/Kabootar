import { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';

function createData(id, date, schedule, recipient, subject) {
	return { id, date, schedule, recipient, subject };
}

function History() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('http://localhost:5000/mails/history', {
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
	}, [ctx.token]);
	
	return <Layout editor={false} list={loadedData} title={'History'} />;
}

export default History;
