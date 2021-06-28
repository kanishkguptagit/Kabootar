import { Fragment } from "react";

import Layout from '../components/Layout';

function Create () {

    const getEnteredValues = (to, subject, body) => {
        console.log("in create page",to,subject,body); //recieved sending credentials
    }

    return <Fragment>
        <Layout editor={true}  title={"Create"} getEnteredValues={getEnteredValues}  />
    </Fragment>
}

export default Create;