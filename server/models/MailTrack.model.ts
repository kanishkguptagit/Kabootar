import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMailTrack {
	_id: Types.ObjectId;
	openedTimes: String[];
	clickedTimes: Number;
	totalSentTimes: Number;
	created_at: Date;
}

export interface ICreateMailTrack extends Pick<IMailTrack, 'totalSentTimes'> {}

interface IMailTrackBase extends Omit<IMailTrack, '_id'>, Document {}

const MailTrackSchema = new Schema(
	{
		openedTimes: { type: [String], default: [], required: false },
		clickedTimes: { type: Number, default: 0, required: false },
		totalSentTimes: { type: Number, required: true },
	},
	{ timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model<IMailTrackBase>('MailTrack', MailTrackSchema);
