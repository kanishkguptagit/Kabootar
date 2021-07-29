import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMail {
	_id: Types.ObjectId;
	name?: string;
	owner: Types.ObjectId;
	recipents: Array<string>;
	subject: string;
	body: string;
	scheduled?: String;
	isScheduled?: boolean;
	mailTracks: Types.ObjectId[];
}

export interface ICreateMail extends Omit<IMail, '_id' | 'mailTracks'> {}

interface IMailBase extends Omit<IMail, '_id'>, Document {}

const MailSchema = new Schema({
	name: { type: String, required: false, trim: true },
	owner: { type: Schema.Types.ObjectId, required: true, index: true },
	recipents: [String],
	subject: { type: String, required: true },
	body: { type: String, required: true },
	scheduled: { type: Date, required: false, default: new Date().toISOString() },
	isScheduled: { type: Boolean, required: false, default: false, index: true },
	mailTracks: { type: [Schema.Types.ObjectId], required: false, default: [] },
});

export default mongoose.model<IMailBase>('Mail', MailSchema);
