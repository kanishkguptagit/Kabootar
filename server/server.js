const express = require('express');
const cors = require('cors');
const connectToDB = require('./startup/db').default;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; //server defined

connectToDB();

app.use(cors()); //middleware
app.use(express.json());

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
