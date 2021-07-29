import chalk from 'chalk';

import { IMail } from '../../models/Mail.model';
import { sendMail } from './sendMailCore';
import { createMailTrack, transformHTML } from '../analytics';

export default async function sendMailToRecipents(mail: IMail) {
	const mailTrackId = await createMailTrack(mail);

	const sendingPromises = mail.recipents.map(async recipent => {
		const transformedHTML = transformHTML({ recipent, mailTrackId, body: mail.body });
		await sendMail({
			to: recipent,
			subject: mail.subject,
			html: transformedHTML,
		}).catch(e => console.log(chalk.red.bgWhite('mail sending failed --> ', e)));
	});

	await Promise.all(sendingPromises);
}
