import { Router } from 'express';

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

router.post('/add', (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	if (!(email && password && firstName)) {
		throw new Error('The email, password and the firstname fields are required');
	}
	const newUser = new Users({ email, firstName, lastName, password });
	newUser
		.save()
		.then(user => {
			delete (user as any).password;
			return res.status(201).json({ sucess: true, result: user });
		})
		.catch(err => res.status(500).json({ success: false, result: err }));
});

export default router;
