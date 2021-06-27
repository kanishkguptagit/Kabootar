import chalk from 'chalk';
import nodemailer from 'nodemailer';
import { MailTrackOptions } from 'nodemailer-mail-tracking/src/types';
// @ts-ignore
import awsTransport from 'nodemailer-ses-transport';
import { IMail } from '../models/Mail.model';
import aws from 'aws-sdk';

export const mailTrackOptions: MailTrackOptions = {
	baseUrl: 'https://fe06c22bc3ef.ngrok.io/mail-track',
	jwtSecret: 'awesome-secret',
	getData: data => {
		return { ...data, blue: 'whale' };
	},
	onBlankImageView: async data => {
		console.log('image opened', data);
	},
	onLinkClick: async data => {
		console.log('link clicked', data);
	},
};
interface IMailContent {
	to: string[];
	subject: string;
	html: string;
}

async function sendMail(mailContent: IMailContent) {
	const transporter = nodemailer.createTransport(
		awsTransport({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
		})
	);

	mailContent.to.forEach(async t => {
		console.log(chalk.yellow.bgWhite('sending email to'), t);
		const info = await transporter.sendMail({
			from: 'instinctzuper@gmail.com',
			to: t,
			subject: mailContent.subject,
			html: mailContent.html,
		});

		console.log(info, chalk.green.bgWhite('email was sent'));
		// ses needs a 60 second gap
		await new Promise(resolve => setTimeout(resolve, 60 * 1000));
	});
}

export async function sendMailToRecipents(mail: IMail) {
	try {
		console.log('the mail was', mail);
		if (!mail.isScheduled) {
			await sendMail({
				to: mail.recipents,
				subject: mail.subject,
				html: mail.body,
			});
		}
	} catch (e) {
		console.log(chalk.red.bgWhite('failed', e));
	}
}

export function sendConfirmationEmail(email: string) {
	const ses = new aws.SES();
	ses.verifyEmailAddress(
		{
			EmailAddress: email,
		},
		(err, data) => {
			if (err) {
				console.log(chalk.red.bgWhiteBright('sending confirmation mail error', err));
				return;
			}
			console.log(chalk.green.bgWhiteBright('sent confirmation mail -'), data);
		}
	);
}
