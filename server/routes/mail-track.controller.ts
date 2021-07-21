import chalk from 'chalk';
import { Router } from 'express';

import MailTrack from '../models/MailTrack.model';

const router = Router();

router.get('/url/:mailTrackId/*', (req, res) => {
	const mailTrackId = req.params.mailTrackId;
	const redirectUrl = (req.params as any)[0];

	res.redirect(redirectUrl);

	MailTrack.findOneAndUpdate({ _id: mailTrackId }, { $inc: { linkClicks: 1 } }).then(result => {
		console.log(chalk.bgWhiteBright.green(result?._id, ' was CLICKED'));
	});
});

const image = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>`;

router.get('/open/:mailTrackId', (req, res) => {
	const mailTrackId = req.params.mailTrackId;
	res.set('Content-Type', 'image/svg+xml');
	res.send(image);

	MailTrack.findOneAndUpdate({ _id: mailTrackId }, { $set: { wasOpened: true } }).then(result => {
		console.log(chalk.bgWhiteBright.green(result?._id, ' was OPENED'));
	});
});

export default router;
