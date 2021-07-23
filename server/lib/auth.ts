import { NextFunction, Request } from 'express';

import Users, { IUser } from '../models/User.models';
import { getPayloadFromJWT } from './jwt';

async function _getAuthUser(req: Request) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return null;
	}

	const token = authHeader.split(' ')[1];

	const payload = getPayloadFromJWT(token);

	if (!payload) {
		return null;
	}

	const foundUser = await Users.findOne({ _id: payload.userId }, { password: 0 }).lean();

	return foundUser;
}

export default async function getAuthUser(
	req: Request,
	next: NextFunction,
	throwError: boolean = true
): Promise<IUser> {
	const authUser = await _getAuthUser(req);

	if (!authUser && throwError) {
		return next(new Error('User not logged in')) as any;
	}

	return authUser as any;
}
