import { Fragment } from "react";
import TextField from "@material-ui/core/TextField";

import Layout from '../components/Layout';

function Create () {
    return <Fragment>
        <Layout editor={true}  title={"Create"} />
    </Fragment>
}

export default Create;