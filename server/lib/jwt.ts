import chalk from 'chalk';
import jwt from 'jsonwebtoken';

import { IUser } from '../models/User.models';

export function createJWT(
	email: IUser['email'],
	userId: IUser['_id'],
	duration: number = 24 * 60 * 60 * 1000 * 60
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

export function getPayloadFromJWT(token: string): Record<string, unknown> | null {
	try {
		const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? 'jwttokensecret');

		return payload as any;
	} catch (e) {
		console.log(chalk.bgRed.white('Could not verify JWT for user auth!'));
		return null;
	}
}
