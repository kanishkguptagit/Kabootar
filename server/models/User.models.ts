import mongoose, { Schema, Document } from 'mongoose';

interface IBaseUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
}

export interface IUser extends Omit<IBaseUser, 'password'> {}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: false, trim: true },
});

export default mongoose.model<IBaseUser>('User', UserSchema);
