import Mails from '../../models/Mail.model';
import MailTracks from '../../models/MailTrack.model';

interface ISingleMailAnalytics {
	sent: number;
	opened: number;
	linksClicked: number;
	datesSent: string[];
}

interface ISingleUserAnalytics {
	totalMails: number;
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

export async function getAnalyticsForSingleUser(userId?: string): Promise<ISingleUserAnalytics> {
	const foundMails = await Mails.find({ owner: userId }).lean();

	let totalMails: number = 0;
	foundMails?.forEach(foundMail => {
		totalMails += foundMail.recipents.length;
	});

	return { totalMails };
}
