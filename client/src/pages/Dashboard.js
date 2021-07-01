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

const capitalize = s => {
	if(s)
		return s[0].toUpperCase() + s.slice(1);
};

function Dashboard() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [name, setName] = useState('Dashboard');

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

		const fetchName = async () => {
			const url = 'https://kabootar-mail.herokuapp.com/users/' + ctx.userId;
			const response = await fetch(url);

			const data = await response.json();

			const capName =
				capitalize(data.result.firstName) + ' ' + capitalize(data.result.lastName);

			setName(capName);
		};

		fetchData();
		fetchName();
	}, [ctx.token, setLoadedData, ctx.userId, setName]);

	return <Layout editor={false} chart={chart} block={block} list={loadedData} title={name} />;
}

export default Dashboard;
