import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: true },
		salt: { type: String, select: true },
		sessionToken: { type: String, select: false },
	},
});

export const UserModal = mongoose.model('User', UserScheme);

export const getUser = () => UserModal.find();
export const getUserByEmail = (email: string) => UserModal.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
	UserModal.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModal.findById(id);
export const createUser = (values: Record<string, any>) =>
	new UserModal(values).save().then((user) => user.toObject());

export const deleteUser = (id: string) =>
	UserModal.findByIdAndDelete({
		_id: id,
	});
export const updateUserById = (id: string, values: Record<string, any>) =>
	UserModal.findByIdAndUpdate(id, values);
