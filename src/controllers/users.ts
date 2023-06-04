import {
	getUser,
	deleteUserById,
	updateUserById,
	getUserById,
} from '../db/users';
import express from 'express';

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await getUser();

		return res.status(200).json(user);
	} catch (error) {
		console.error('Error in controllers/users.ts(getAllUsers) : ', error);

		return res.sendStatus(400);
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const deletedUser = await deleteUserById(id);

		return res.json(deletedUser);
	} catch (error) {
		console.error('Error in controllers/users.ts(deleteUser) : ', error);

		return res.sendStatus(400);
	}
};

export const updateUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { username } = req.body;
		const { id } = req.params;
		if (!username)
			return res.status(400).json({ message: 'username is required' });

		const user = await getUserById(id);
		user.username = username;
		await user.save();

		return res.status(200).json(user).end;
	} catch (error) {
		console.error('Error in controllers/users.ts(updateUser) : ', error);

		return res.sendStatus(400);
	}
};
