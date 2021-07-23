const express = require('express');
const cors = require('cors');

const { UserRoutes, MailRoutes, MailTrackRoutes } = require('./routes');
const { errorMiddleware } = require('./middleware');

if (process.env.NODE_ENV?.toLowerCase() === 'production') {
	require('dotenv').config({ path: './.env.production' });
} else {
	require('dotenv').config();
}

require('./startup');

const app = express();
const port = process.env.PORT || 5000; //server defined

app.use(cors()); //middleware
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/mails', MailRoutes);
app.use('/mail-track', MailTrackRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
