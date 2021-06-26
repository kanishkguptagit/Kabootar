import { Fragment } from 'react';

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