import MailTracks, { ICreateMailTrack, IMailTrack } from '../../models/MailTrack.model';
import Mails, { IMail } from '../../models/Mail.model';

export async function createMailTrack(mail: IMail): Promise<IMailTrack['_id']> {
	const createdMailTrack: ICreateMailTrack = {
		totalSentTimes: 1 * mail.recipents.length,
	};

	const newMailTrack = new MailTracks(createdMailTrack);
	// not expecting a db failure
	await newMailTrack.save();

	const mailTrack = newMailTrack.toObject();

	await Mails.updateOne(
		{ _id: mail._id },
		{
			$addToSet: {
				mailTracks: mailTrack._id,
			},
		}
	);

	return mailTrack._id;
}
