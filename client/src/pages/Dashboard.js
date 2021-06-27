import { useEffect, useContext, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext, { AuthContextProvider } from '../store/auth-context';

function createData(id, schedule, recipient, subject) {
	return { id, schedule, recipient, subject };
}

const rows = [
	createData(
		0,
		'16 Mar, 2019',
		'20 Mar, 2019, 10:40 am',
		'Mitra Choda',
		'Mitra being Mitra with his chutiyap'
	),
	createData(1, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
	createData(2, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
	createData(3, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
	createData(4, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
];

const chart = {
	enable: true,
};

const block = {
	enable: true,
	details: null,
};

const list = {
	enable: true,
	items: rows,
};

function Dashboard() {
	const ctx = useContext(AuthContext);

	const [loadedData, setLoadedData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:5000/mails/dashboard', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			});

			const data = await response.json();

			setLoadedData(data.result);
		};

		fetchData();
	}, []);

	return <Layout editor={false} chart={chart} block={block} list={list} title={'Dashboard'} />;
}

export default Dashboard;
