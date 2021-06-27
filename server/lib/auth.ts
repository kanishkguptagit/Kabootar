import { Request } from 'express';

import Users, { IUser } from '../models/User.models';
import { getPayloadFromJWT } from './jwt';

export default async function getAuthUser(req: Request): Promise<IUser | null> {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return null;
	}

	const token = authHeader.split(' ')[1];

	const payload = getPayloadFromJWT(token);

	if (!payload) {
		return null;
	}

	const foundUser = await Users.findOne({ _id: payload.userId });

	return foundUser;
}
