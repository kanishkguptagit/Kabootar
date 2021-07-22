import chalk from 'chalk';
import { Router } from 'express';

import MailTrack from '../models/MailTrack.model';
import { decodeData } from '../lib/analytics';

const router = Router();

router.get('/url/:encodedJWT/*', (req, res) => {
	const redirectUrl = (req.params as any)[0];

	res.redirect(redirectUrl);

	const decodedData = decodeData(req.params.encodedJWT);

	if (decodedData) {
		MailTrack.findOneAndUpdate(
			{ _id: decodedData.mailTrackId },
			{ $inc: { clickedTimes: 1 } }
		).then(result => {
			console.log(
				chalk.bgWhiteBright.green(
					result?._id,
					' was CLICKED by recipent ',
					decodedData.recipent
				)
			);
		});
	}
});

const image = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>`;

router.get('/open/:encodedJWT', (req, res) => {
	res.set('Content-Type', 'image/svg+xml');
	res.send(image);

	const decodedData = decodeData(req.params.encodedJWT);

	if (decodedData) {
		MailTrack.findOneAndUpdate(
			{ _id: decodedData.mailTrackId },
			{ $addToSet: { openedTimes: decodedData.recipent } }
		).then(result => {
			console.log(
				chalk.bgWhiteBright.green(
					result?._id,
					' was OPENED by recipent ',
					decodedData.recipent
				)
			);
		});
	}
});

export default router;
