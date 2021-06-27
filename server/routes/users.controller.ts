import { Router } from 'express';

import { createJWT } from '../lib/jwt';
import { Users } from '../models';

const router = Router();

router.get('/:id', (req, res) => {
	Users.findOne({ _id: req.params.id }, { password: 0 })
		.then(foundUser => {
			return res.status(200).json({ success: true, result: foundUser });
		})
		.catch(err => {
			return res.status(404).json({ success: false, result: err });
		});
});

router.post('/signup', (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	if (!(email && password && firstName)) {
		throw new Error('The email, password and the firstname fields are required');
	}
	const newUser = new Users({ email, firstName, lastName, password });
	newUser.save().then(user => {
		const accessToken = createJWT(user.email, user._id);
		return res.status(201).json({
			sucess: true,
			result: {
				accessToken,
				id: user._id,
			},
		});
	});
});

router.post('/signin', async (req, res, next) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		return next(new Error('The email and password fields are required'));
	}

	const foundUser = await Users.findOne({ email });
	if (!foundUser) {
		return next(new Error('A user with this email could not be found'));
	}
	if (foundUser.password !== password) {
		return next(new Error('The entered password is incorrect'));
	}

	const accessToken = createJWT(foundUser.email, foundUser._id);
	return res.json({
		sucess: true,
		result: {
			accessToken,
			id: foundUser._id,
		},
	});
});

export default router;