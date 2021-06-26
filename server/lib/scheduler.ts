import Agenda from 'agenda';
import mongoose from 'mongoose';

enum jobNames {
	sendScheduledMail = 'send-scheduled-mail',
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
		this.agenda.start();
		this.agenda.define(jobNames.sendScheduledMail, async (job: any) => {
			const { to }: { to: string } = job.attrs.data;
			console.log('an email was sent to', to);
		});
	}

	public createScheduledEmail(when: Date, to: string) {
		this.agenda.schedule(when, jobNames.sendScheduledMail, { to });
	}
}
