import { Router } from 'express';

import getAuthUser from '../lib/auth';
import { createAndSendMail } from '../lib/mailer';
import { getScheduledDate } from '../lib/utils';
import Mail, { IMail, ICreateMail } from '../models/Mail.model';
import { getAnalyticsForSingleMail } from '../lib/analytics';
import { getAnalyticsForSingleUser } from '../lib/analytics/getAnalytics';
import { cancelMail } from '../lib/scheduler';

const router = Router();

router.post('/add', async (req, res, next) => {
	const { to, subject, body, name, isScheduled, isRecurring, scheduled } = req.body;
	if (!(to && subject && body && Array.isArray(to))) {
		return next(new Error('to, subject, body are required fields'));
	}
	const user = await getAuthUser(req, next);

	const recurringString = scheduled;
	const sanitizedScheduledDateString = getScheduledDate(scheduled, isScheduled);

	const createdMail: ICreateMail = {
		name,
		recipents: to,
		subject,
		body,
		owner: user._id as any,
		isScheduled: isScheduled || isRecurring ? true : false,
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
	createAndSendMail(savedMailObject as IMail, { isRecurring, recurringString });

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
	const mails = await Mail.find({ owner: user._id, isScheduled: false }).sort({ _id: -1 }).lean();
	return res.json({ success: true, result: mails });
});

router.get('/dashboard', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	const mails = await Mail.find({ owner: user._id, isScheduled: true }).sort({ _id: -1 }).lean();
	return res.json({ success: true, result: mails });
});

router.get('/analytics/user', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	return res.json(await getAnalyticsForSingleUser(user._id));
});

router.get('/analytics/:mailId', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}
	return res.send(await getAnalyticsForSingleMail(req.params.mailId));
});

router.delete('/cancel/:mailId', async (req, res, next) => {
	const user = await getAuthUser(req, next);
	if (!user) {
		return res.json({ success: false, result: 'User not found' });
	}

	return res.json({ cancelled: await cancelMail(req.params.mailId) });
});

export default router;
