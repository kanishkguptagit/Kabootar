import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMailTrack {
	_id: Types.ObjectId;
	mailId: Types.ObjectId;
	wasOpened: Boolean;
	linkClicks: Number;
}

export interface ICreateMailTrack extends Omit<IMailTrack, '_id'> {}

interface IMailTrackBase extends Document {}

const MailTrackSchema = new Schema({
	mailId: { type: Schema.Types.ObjectId, required: true, index: true, unique: true },
	wasOpened: { type: Boolean, default: false, index: true },
	linkClicks: { type: Number, default: 0 },
});

export default mongoose.model<IMailTrackBase>('MailTrack', MailTrackSchema);
