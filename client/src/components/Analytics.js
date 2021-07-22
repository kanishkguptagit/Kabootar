import React, { Fragment } from 'react';

import classes from '../styles/analytics.module.css';

export default function Analytics() {
	return (
		<Fragment>
			<div className={classes.list_content}>
				<ul className={classes.list_items}>
					<li>Total Recipients = 20</li>
					<li>Total Opened = 15</li>
					<li>Total Clicked = 10</li>
				</ul>
			</div>
		</Fragment>
	);
}
