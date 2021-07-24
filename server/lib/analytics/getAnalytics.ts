import Mails from '../../models/Mail.model';
import MailTracks from '../../models/MailTrack.model';

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

	const foundMail = await Mails.findOne({ _id: mailId }, { mailTracks: 1 }).lean();
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
	const foundMails = await Mails.find({ owner: userId }, { scheduled: 1, recipents: 1 })
		.sort({ scheduled: 'desc' })
		.lean();

	let totalMails: number = 0;
	const graph: IGraphData[] = [{ sent: 0, date: '' }];

	foundMails?.forEach(({ recipents, scheduled }) => {
		const recipentsSent = recipents.length;
		totalMails += recipentsSent;
		if (graph[graph.length - 1].date + '' == scheduled) {
			// merge the same dates
			graph[graph.length - 1].sent += recipentsSent;
		} else {
			graph.push({ sent: recipentsSent, date: scheduled ? scheduled + '' : '' });
		}
	});

	graph.shift();

	return { totalMails, graph };
}

interface ISingleMailAnalytics {
	sent: number;
	opened: number;
	linksClicked: number;
	datesSent: string[];
}

interface IGraphData {
	sent: number; // x-axis
	date: string; // y-axis
}
interface ISingleUserAnalytics {
	totalMails: number;
	graph: IGraphData[];
}
