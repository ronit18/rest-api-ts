import { createUser, getUserByEmail } from '../db/users';
import express from 'express';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) return res.sendStatus(400);

		const existingUser = await getUserByEmail(email);

		if (existingUser) return res.status(409).send('User already exists');

		const salt = random();

		const user = await createUser({
			email,
			username,
			authentication: {
				password: authentication(salt, password),
				salt,
			},
		});

		return res.status(201).json(user).end();
	} catch (error) {
		console.error('Error in controllers/authentication.ts : ', error);
		return res.sendStatus(400);
	}
};