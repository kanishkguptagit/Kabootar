const express = require('express');
const cors = require('cors');
const { expressApp } = require('nodemailer-mail-tracking');

const { mailTrackOptions } = require('./lib/mailer');
const { UserRoutes } = require('./routes');
const { default: errorHandler } = require('./lib/errorHandler');

require('dotenv').config();

require('./startup');

const app = express();
const port = process.env.PORT || 5000; //server defined

app.use(cors()); //middleware
app.use(express.json());

app.use('/mail-track', expressApp(mailTrackOptions));
app.use('/users', UserRoutes);

app.use((err, req, res, _next) => errorHandler(err, req, res));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
