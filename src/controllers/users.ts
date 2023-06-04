import { getUser, deleteUserById } from '../db/users';
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
