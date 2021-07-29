import chalk from 'chalk';
import jwt from 'jsonwebtoken';

import type { IHiddenData } from './transformHTML';

export function encodeData({ recipent, mailTrackId }: IHiddenData) {
	return jwt.sign(
		{
			recipent,
			mailTrackId,
		},
		process.env.JWT_TOKEN_SECRET ?? 'jwttokensecret',
		{
			expiresIn: '1y',
		}
	);
}

export function decodeData(token: string): IHiddenData | null {
	try {
		const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? 'jwttokensecret');

		return payload as any;
	} catch (e) {
		console.log(chalk.bgRed.white('Could not verify JWT for mail-track'));
		return null;
	}
}
