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
		console.error(
			'Error in controllers/authentication.ts(register) : ',
			error
		);
		return res.sendStatus(400);
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) return res.status(400).send('Bad request');

		const user = await getUserByEmail(email).select(
			'+authentication.salt +authentication.password'
		);

		if (!user) return res.status(404).send('User not found');

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== expectedHash)
			return res.status(401).send('Unauthorized');

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString()
		);
		res.cookie('RONIT_AUTH', user.authentication.sessionToken, {
			domain: 'localhost',
			path: '/',
		});
		return res.status(200).json(user).end();
	} catch (error) {
		console.error(
			'Error in controllers/authentication.ts(login) : ',
			error
		);
		return res.sendStatus(400);
	}
};
