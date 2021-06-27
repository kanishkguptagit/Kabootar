import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMail {
	name?: string;
	owner: Types.ObjectId;
	recipents: Array<string>;
	subject: string;
	body: string;
}

interface IMailBase extends IMail, Document {}

const MailSchema = new Schema({
	name: { type: String, required: false, trim: true },
	owner: { type: Schema.Types.ObjectId, required: true, index: true },
	recipents: [String],
	subject: { type: String, required: true },
	body: { type: String, required: true },
});

export default mongoose.model<IMailBase>('Mail', MailSchema);
