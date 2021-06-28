import { Router } from 'express';

import getAuthUser from '../lib/auth';
import { sendMailToRecipents, sendScheduledMail } from '../lib/mailer';
import Mail, { IMail } from '../models/Mail.model';

const router = Router();

router.post('/add', async (req, res, next) => {
	const { to, subject, body, name, isScheduled, scheduled } = req.body;
	if (!(to && subject && body && Array.isArray(to))) {
		return next(new Error('to, subject, body are required fields'));
	}
	const user = await getAuthUser(req, next);
	const createdMail: IMail = {
		name,
		recipents: to,
		subject,
		body,
		owner: user._id,
		isScheduled: isScheduled ?? false,
		scheduled: scheduled ?? Date.now(),
	};
	const newMail = new Mail(createdMail);

	const savedMail = await newMail.save();
	if (!savedMail) {
		return res.status(500).json({
			success: false,
		});
	}

	const savedMailObject = savedMail.toObject();
	if (
		savedMail.isScheduled &&
		savedMail.scheduled instanceof Date &&
		!isNaN(savedMail.scheduled?.valueOf())
	) {
		sendScheduledMail(savedMailObject as IMail);
	} else {
		sendMailToRecipents(savedMailObject as IMail);
	}

	return res.status(200).json({
		success: true,
		result: savedMailObject,
	});
});

router.get('/history', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	const mails = await Mail.find({ owner: user._id, isScheduled: true });
	return res.json({ success: true, result: mails });
});

router.get('/dashboard', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	const mails = await Mail.find({ owner: user._id, isScheduled: false });
	return res.json({ success: true, result: mails });
});

export default router;
