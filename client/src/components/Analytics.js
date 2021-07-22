import React, { useEffect, useState } from 'react';

import BarGraphPoint from './BarGraphPoint';
import classes from '../styles/analytics.module.css';

export default function Analytics({ mailId, ctx }) {
	const [state, setState] = useState({ sent: 0, opened: 0, linksClicked: 0 });

	useEffect(() => {
		const fetchData = async () => {
			const url = process.env.REACT_APP_BACKEND + '/mails/analytics/' + mailId;
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			console.log(data, 'after fetched');
		};

		fetchData();
	}, [ctx.token, mailId]);

	return (
		<>
			<div className={classes.center_content}>
				<BarGraphPoint />
			</div>
			<div className={classes.center_content}>
				<ul className={classes.list_items}>
					<li>Total Recipients = {state.sent}</li>
					<li>Total Opened = {state.opened}</li>
					<li>Total Clicked = {state.linksClicked}</li>
				</ul>
			</div>
		</>
	);
}
