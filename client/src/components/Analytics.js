import React, { Fragment, useEffect, useState } from 'react';

import BarGraphPoint from './BarGraphPoint';
import classes from '../styles/analytics.module.css';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

export default function Analytics({ mailId, ctx }) {
	const [sent, setSent] = useState();
	const [opened, setOpened] = useState();
	const [linksClicked, setLinksClicked] = useState();
	const [barData, setBarData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const url = process.env.REACT_APP_BACKEND + '/mails/analytics/' + mailId;
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			setSent(data.sent);
			setOpened(data.opened);
			setLinksClicked(data.linksClicked);

			const bar = [
				{ name: 'Total Mails', mails: sent },
				{ name: 'Opened', mails: opened },
				{ name: 'Clicked', mails: linksClicked },
			];

			setBarData(bar);

			setLoading(false);
		};

		fetchData();
	}, [ctx.token, mailId, linksClicked, opened, sent]);

	return (
		<>
			{!loading && (
				<Fragment>
					<div className={classes.center_content}>
						<BarGraphPoint data={barData} />
					</div>
					<div className={classes.center_content}>
						<ul className={classes.list_items}>
							<li>Total Recipients = {sent}</li>
							<li>Total Opened = {opened}</li>
							<li>Total Clicked = {linksClicked}</li>
						</ul>
					</div>
				</Fragment>
			)}

			{loading && <LoadingSpinner />}
		</>
	);
}
