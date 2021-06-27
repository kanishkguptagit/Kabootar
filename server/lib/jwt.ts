import jwt from 'jsonwebtoken';

import { IUser } from '../models/User.models';

export function createJWT(
	email: IUser['email'],
	userId: IUser['_id'],
	duration: number = 10 * 60 * 1000
) {
	const payload = {
		email,
		userId,
		duration,
	};

	return jwt.sign(payload, process.env.JWT_TOKEN_SECRET ?? 'jwttokensecret', {
		expiresIn: duration,
	});
}

export function getUserFromJWT(token: string): IUser | null {
	const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? 'jwttokensecret');
	console.log('the payload was', payload);
	return payload as any;
}
