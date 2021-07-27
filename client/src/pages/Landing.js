import { Fragment, useContext } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import classes from '../styles/Landing.module.css';
import AuthContext from '../store/auth-context';

function Landing() {
	const ctx = useContext(AuthContext);

	let continueButton;

	if (ctx.isLoggedIn) continueButton = '/dashboard';
	else continueButton = '/signin';

	return (
		<Fragment>
			<div className={`${classes.image} ${classes.centered}`}>
				<img src="/logos/icon.png" alt="Logo" />
			</div>
			<div className={`${classes.heading} ${classes.centered}`}>Kabootar</div>
			<div className={classes.centered}>
				<Link to={continueButton}>
					<Button
						variant="outlined"
						color="primary"
						size="large"
						style={{ textTransform: 'none' }}>
						Continue to Kabootar
					</Button>
				</Link>
			</div>
		</Fragment>
	);
}

export default Landing;
