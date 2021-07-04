import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMail {
	_id:Types.ObjectId;
	name?: string;
	owner: Types.ObjectId;
	recipents: Array<string>;
	subject: string;
	body: string;
	scheduled?: Date;
	isScheduled?: boolean;
}

export interface ICreateMail extends Omit<IMail,'_id'>{}

interface IMailBase extends Omit<ICreateMail, 'scheduled'>, Document {
	scheduled: Date | null;
}

const MailSchema = new Schema({
	name: { type: String, required: false, trim: true },
	owner: { type: Schema.Types.ObjectId, required: true, index: true },
	recipents: [String],
	subject: { type: String, required: true },
	body: { type: String, required: true },
	scheduled: { type: Date, required: false },
	isScheduled: { type: Boolean, required: false, index: true },
});

export default mongoose.model<IMailBase>('Mail', MailSchema);
