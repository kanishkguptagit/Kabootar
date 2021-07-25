import chalk from 'chalk';

import { IMail } from '../../models/Mail.model';
import Scheduler from '../scheduler';
import { sendConfirmationEmail } from './sendMailCore';
import sendMailToRecipents from './sendTrackedMailToRecipents';

function sendScheduledMail(mail: IMail) {
	try {
		console.log(chalk.blueBright.whiteBright('scheduling a mail for'), mail);
		const dateObject = new Date(mail.scheduled?.valueOf() as string);
		new Scheduler().createScheduledEmail(dateObject, mail);
	} catch (e) {
		console.log(chalk.red.bgWhite('scheduling the mail failed', e));
	}
}

function sendRecurringMail(mail: IMail, recurringString: string) {
	try {
		console.log(chalk.cyan.whiteBright('recurring a mail for'), mail);
		new Scheduler().createRecurringEmail(recurringString, mail);
	} catch (e) {
		console.log(chalk.red.bgWhite('recurring the mail failed', e));
	}
}

export function createAndSendMail(mail: IMail, recurring?: IRecurring) {
	if (recurring && recurring.isRecurring) {
		sendRecurringMail(mail, recurring.recurringString);
	} else if (mail.isScheduled) {
		sendScheduledMail(mail);
	} else {
		sendMailToRecipents(mail);
	}
}

export { sendConfirmationEmail, sendMailToRecipents };

interface IRecurring {
	isRecurring: boolean;
	recurringString: string;
}
