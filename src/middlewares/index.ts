import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.cookies['RONIT_AUTH'];
		if (!sessionToken) return res.sendStatus(403);

		const existingUser = await getUserBySessionToken(sessionToken);
		if (!existingUser) return res.sendStatus(401);

		merge(req, { identity: existingUser });

		return next();
	} catch (error) {
		console.error(
			'Error in middlewares/index.ts(isAuthenticated) : ',
			error
		);
		return res.sendStatus(400);
	}
};

export const isAdmin = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const { id } = req.params;
		const currentUserId = get(req, 'identity._id') as string;
		if (!currentUserId) return res.sendStatus(403);
		if (currentUserId !== id) return res.sendStatus(401);

		return next();
	} catch (error) {
		console.error('Error in middlewares/index.ts(isAdmin) : ', error);
		return res.sendStatus(400);
	}
};
