import Agenda from 'agenda';
import chalk from 'chalk';
import mongoose, { Types } from 'mongoose';

import Mail, { IMail } from '../models/Mail.model';
import { sendMailToRecipents } from './mailer';

enum jobNames {
	sendScheduledMail = 'send-scheduled-mail',
	recurringMail = 'send-recurring-mail',
}
export default class Scheduler {
	private agenda: Agenda;
	constructor() {
		this.agenda = new Agenda({
			mongo: mongoose.connection.getClient().db(),
			db: {
				collection: 'scheduledJobs',
			} as any,
		});
		this.init();
	}

	private init() {
		// start agenda timers
		this.agenda.start();
		// define jobnames so that agenda can dispatch that job
		this.agenda.define(jobNames.sendScheduledMail, async (job: any) => {
			const { mail }: { mail: IMail } = job.attrs.data;

			console.log(chalk.white.bgBlue('sending a scheduled mail to'), mail);
			sendMailToRecipents(mail);

			await Mail.updateOne({ _id: mail._id }, { isScheduled: false });

			// if (job.length > 0) {
			// 	await this.agenda.cancel({ _id: job.attrs._id }); // reschedule the job for the user
			// }
		});

		this.agenda.define(jobNames.recurringMail, async (job: any) => {
			const { mail }: { mail: IMail } = job.attrs.data;
			console.log(chalk.white.bgBlueBright('sending a recurring mail to'), mail);
			sendMailToRecipents(mail);

			// update the scheduled of the mail to the last date
			await Mail.updateOne({ _id: mail._id }, { scheduled: new Date().toISOString() });
		});
	}

	public createRecurringEmail(when: string, mail: IMail) {
		this.agenda.every(when, jobNames.recurringMail, { mail });
	}

	public createScheduledEmail(when: Date | string, mail: IMail) {
		this.agenda.schedule(when, jobNames.sendScheduledMail, { mail });
	}

	public async cancelRecurringOrScheduledMail(mailId: Types.ObjectId) {
		return await this.agenda.cancel({
			'data.mail._id': mailId,
		});
	}
}

export async function cancelMail(mailId: string): Promise<boolean> {
	const cancelledCount = await new Scheduler().cancelRecurringOrScheduledMail(
		Types.ObjectId(mailId)
	);

	return cancelledCount && cancelledCount > 0 ? true : false;
}
