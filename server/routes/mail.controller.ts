import { Router } from 'express';

import getAuthUser from '../lib/auth';
import { createAndSendMail } from '../lib/mailer';
import { getScheduledDate } from '../lib/utils';
import Mail, { IMail, ICreateMail } from '../models/Mail.model';
import { getAnalyticsForUser } from '../lib/analytics';

const router = Router();

router.post('/add', async (req, res, next) => {
	const { to, subject, body, name, isScheduled, scheduled } = req.body;
	if (!(to && subject && body && Array.isArray(to))) {
		return next(new Error('to, subject, body are required fields'));
	}
	const user = await getAuthUser(req, next);

	const sanitizedScheduledDateString = getScheduledDate(scheduled);

	const createdMail: ICreateMail = {
		name,
		recipents: to,
		subject,
		body,
		owner: user._id,
		isScheduled: isScheduled ?? false,
		scheduled: sanitizedScheduledDateString,
	};
	const newMail = new Mail(createdMail);

	const savedMail = await newMail.save();
	if (!savedMail) {
		return res.status(500).json({
			success: false,
		});
	}

	const savedMailObject = savedMail.toObject();
	createAndSendMail(savedMailObject as IMail);

	return res.status(200).json({
		success: true,
		result: savedMailObject,
	});
});

router.get('/history', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	const mails = await Mail.find({ owner: user._id, isScheduled: false }).sort({ _id: -1 });
	return res.json({ success: true, result: mails });
});

router.get('/dashboard', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	const mails = await Mail.find({ owner: user._id, isScheduled: true }).sort({ _id: -1 });
	return res.json({ success: true, result: mails });
});

router.get('/analytics', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	// mail links clicked
	// mails opened
	// total mails sent
	const ans = await getAnalyticsForUser(user._id);
	return res.send(ans);
});

export default router;
