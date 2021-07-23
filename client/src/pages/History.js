import { useEffect, useContext, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

function createData(id, schedule, recipient, subject) {
	const scheduleDate = new Date(schedule);
	const month = scheduleDate.toDateString();
	const time = scheduleDate.toLocaleTimeString();
	schedule = month + ' - ' + time;
	return { id, schedule, recipient, subject };
}

function History() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [loading, setLoading] = useState(false);

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
			// .then(r => r.json()).catch(err=>console.log(err));

			const data = await response.json();

			if (!data || !data.result || !Array.isArray(data.result)) {
				setLoadedData({ enable: false, items: [] });
				return;
			}

			const results = data.result.map(res =>
				createData(res._id, res.scheduled, res.recipents?.toString(), res.subject)
			);

			setLoadedData({ enable: true, items: results });
		};

		fetchData();
	}, [ctx.token, setLoadedData]);

	return (
		<Layout title="History">
			{!loading && <MailList items={loadedData.items} />}
			{loading && (
				<div className="centered">
					<LoadingSpinner />
				</div>
			)}
		</Layout>
	);
}

export default History;
