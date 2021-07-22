import Mails from '../../models/Mail.model';
import MailTracks from '../../models/MailTrack.model';

interface ISingleMailAnalytics {
	sent: number;
	opened: number;
	linksClicked: number;
	datesSent: string[];
}

export async function getAnalyticsForSingleMail(mailId?: string): Promise<ISingleMailAnalytics> {
	let sent = 0;
	let opened = 0;
	let linksClicked = 0;
	let datesSent: string[] = [];

	if (!mailId) {
		return {
			sent,
			opened,
			linksClicked,
			datesSent,
		};
	}

	const foundMail = await Mails.findOne({ _id: mailId }).lean();
	if (!foundMail) {
		return {
			sent,
			opened,
			linksClicked,
			datesSent,
		};
	}

	const foundMailTracks = await MailTracks.find({ _id: { $in: foundMail.mailTracks } }).lean();

	foundMailTracks.forEach(foundMailTrack => {
		sent += foundMailTrack.totalSentTimes.valueOf();
		opened += foundMailTrack.openedTimes.length;
		linksClicked += foundMailTrack.clickedTimes.valueOf();
		datesSent.push(foundMailTrack.created_at as any);
	});

	return {
		sent,
		opened,
		linksClicked,
		datesSent,
	};
}

// export async function getAnalyticsForUser(userId: IUser['_id']): Promise<IAnalytics> {
// 	const mails = (await Mails.find({ owner: userId }, { _id: 1 })) as Pick<IMail, '_id'>[];
// 	if (!mails || !Array.isArray(mails) || mails.length === 0) {
// 		return { mailsSent: 0, mailsOpened: 0, linksClicked: 0 };
// 	}

// 	const mailTracks = (await MailTracks.find(
// 		{
// 			mailId: {
// 				$in: mails.map(({ _id }) => _id.toHexString()),
// 			},
// 		},
// 		{ mailId: 0 }
// 	).lean()) as Omit<IMailTrack, 'mailId'>[];

// 	// aggregation like $sum is not working in mongodb free tier
// 	const mailsSent = mailTracks.length;

// 	let mailsOpened = 0;
// 	let mailsLinksClicked = 0;

// 	mailTracks.forEach(({ wasOpened, linkClicks }) => {
// 		mailsOpened += wasOpened ? 1 : 0;
// 		mailsLinksClicked += linkClicks.valueOf();
// 	});

// 	return { mailsSent, mailsOpened, mailsLinksClicked };
// }

// // TODO
// export function getAnalyticsForCampaign() {}
