import { Fragment, useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import MailList from '../components/MailList';
import Modal from '../ui/Modal';
import Analytics from '../components/Analytics';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import Graph from '../components/Graph';
import BlockDetail from '../components/BlockDetail';

function createData(id, date, schedule, recipient, subject, recipientSummary) {
	const scheduleDate = new Date(schedule);
	const month = scheduleDate.toDateString();
	const time = scheduleDate.toLocaleTimeString();
	schedule = month + ' - ' + time;
	return { id, date, schedule, recipient, subject, recipientSummary };
}

const capitalize = s => {
	if (s) return s[0].toUpperCase() + s.slice(1);
};

function Dashboard() {
	const ctx = useContext(AuthContext);

	const [openModal, setOpenModal] = useState(false);
	const [mailId, setMailId] = useState('');

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [name, setName] = useState('');

	const [loading, setLoading] = useState(false);
	const [graphLoading, setGraphLoading] = useState(false);
	const [graphData, setGraphData] = useState({ totalMails: 0, graph: [] });

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

		const fetchName = async () => {
			const url = process.env.REACT_APP_BACKEND + '/users/' + ctx.userId;
			const response = await fetch(url);

			const data = await response.json();

			const capName =
				capitalize(data.result.firstName) + ' ' + capitalize(data.result.lastName);

			setName(capName);
		};

		fetchData();
		fetchName();
	}, [ctx.token, setName, ctx.userId]);

	useEffect(() => {
		const fetchData = async () => {
			setGraphLoading(true);

			const url = process.env.REACT_APP_BACKEND + '/mails/analytics/user';
			const result = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			});

			const data = await result.json();

			setGraphData({ totalMails: data.totalMails, graph: data.graph });

			setGraphLoading(false);
		};

		fetchData();
	}, [setGraphLoading, ctx.token]);

	return (
		<Layout title={name}>
			{openModal && (
				<Modal onClose={modalHandler}>
					<Analytics mailId={mailId} ctx={ctx} />
				</Modal>
			)}
			{!loading && (
				<Fragment>
					<Graph items={graphData.graph} loading={graphLoading} />
					<BlockDetail items={graphData.totalMails} />
					<MailList items={loadedData.items} modalHandler={modalHandler} />
				</Fragment>
			)}
			{loading && (
				<div className="centered">
					<LoadingSpinner />
				</div>
			)}
		</Layout>
	);
}

export default Dashboard;
