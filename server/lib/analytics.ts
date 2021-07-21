import { IUser } from '../models/User.models';
import Mails, { IMail } from '../models/Mail.model';
import MailTracks, { IMailTrack } from '../models/MailTrack.model';

interface IAnalytics {
	mailsSent: number;
	mailsOpened: number;
	mailsLinksClicked: number;
}

export async function getAnalyticsForUser(userId: IUser['_id']): Promise<IAnalytics> {
	const mails = (await Mails.find({ owner: userId }, { _id: 1 })) as Pick<IMail, '_id'>[];
	if (!mails || !Array.isArray(mails) || mails.length === 0) {
		return { mailsSent: 0, mailsOpened: 0, mailsLinksClicked: 0 };
	}

	const mailTracks = (await MailTracks.find(
		{
			mailId: {
				$in: mails.map(({ _id }) => _id.toHexString()),
			},
		},
		{ mailId: 0 }
	).lean()) as Omit<IMailTrack, 'mailId'>[];

	// aggregation like $sum is not working in mongodb free tier
	const mailsSent = mailTracks.length;

	let mailsOpened = 0;
	let mailsLinksClicked = 0;

	mailTracks.forEach(({ wasOpened, linkClicks }) => {
		mailsOpened += wasOpened ? 1 : 0;
		mailsLinksClicked += linkClicks.valueOf();
	});

	return { mailsSent, mailsOpened, mailsLinksClicked };
}

// TODO
export function getAnalyticsForCampaign() {}
