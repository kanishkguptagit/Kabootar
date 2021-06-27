import { Router } from 'express';

import getAuthUser from '../lib/auth';
import Mail, { IMail } from '../models/Mail.model';

const router = Router();

router.post('/add', async (req, res, next) => {
	const { to, subject, body, name, isScheduled } = req.body;
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
	};
	const newMail = new Mail(createdMail);

	const savedMail = await newMail.save();
	if (!savedMail) {
		return res.status(500).json({
			success: false,
		});
	}

	return res.status(200).json({
		success: true,
		result: savedMail,
	});
});

export default router;
