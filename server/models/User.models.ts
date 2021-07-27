import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
}

interface IBaseUser extends Omit<IUser, '_id'>, Document {}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: false, trim: true },
});

export default mongoose.model<IBaseUser>('User', UserSchema);
