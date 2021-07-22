import chalk from 'chalk';
import { IMail } from '../../models/Mail.model';
import MailTrack from '../../models/MailTrack.model';
import Scheduler from '../scheduler';
import { addBlankImage, patchLinks } from './transformHTML';
import { sendMail, sendConfirmationEmail } from './sendMailCore';

async function sendMailToRecipents(mail: IMail) {
	try {
		if (!mail.isScheduled) {
			await sendMail({
				to: mail.recipents,
				subject: mail.subject,
				html: mail.body,
			});
		}
	} catch (e) {
		console.log(chalk.red.bgWhite('immediate mail send failed', e));
	}
}

function sendScheduledMail(mail: IMail) {
	try {
		console.log(chalk.blueBright.whiteBright('scheduling a mail for'), mail);
		const dateObject = new Date(mail.scheduled?.valueOf() as string);
		new Scheduler().createScheduledEmail(dateObject, mail);
	} catch (e) {
		console.log(chalk.red.bgWhite('scheduling the mail failed', e));
	}
}

export function createAndSendMail(mail: IMail) {
	const newMailTrack = new MailTrack({
		mailId: mail._id,
	});
	newMailTrack.save();
	// not expecting a db failure

	const mailTrackObject = newMailTrack.toObject();
	const tranformedHTML = addBlankImage(
		patchLinks(mail.body, mailTrackObject._id),
		mailTrackObject._id
	);
	const tranformedMail: IMail = { ...mail, body: tranformedHTML };

	if (tranformedMail.isScheduled) {
		sendScheduledMail(tranformedMail);
	} else {
		sendMailToRecipents(tranformedMail);
	}
}

export { sendConfirmationEmail };
