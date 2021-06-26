import { Fragment } from 'react';
<<<<<<< HEAD
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import classes from '../styles/Landing.module.css';

function Landing() {

    const continueButton = "/signin";

	return (
		<Fragment>
			<div className={`${classes.image} ${classes.centered}`}>
				<img src="/logos/icon.png" alt="Logo" />
			</div>
			<div className={`${classes.heading} ${classes.centered}`}>kabootar</div>
			<div className={classes.centered}>
                <Link to={continueButton}>
				<Button
					variant="outlined"
					color="primary"
					size="large"
					style={{ textTransform: 'none' }}>
					Continue to kabootar
				</Button>
                </Link>
			</div>
		</Fragment>
	);
}

export default Landing;
=======

import classes from '../styles/Landing.module.css';

function Landing(){
    return <Fragment>
        <section >
            <div className={classes.image}>
            <img src="https://source.unsplash.com/G_lwAp0TF38/1800x1800" />
            </div>
        </section>
    </Fragment>
}

export default Landing;
>>>>>>> main
