import chalk from 'chalk';
import nodemailer from 'nodemailer';
// @ts-ignore
import awsTransport from 'nodemailer-ses-transport';
import aws from 'aws-sdk';

interface IMailContent {
	to: string;
	subject: string;
	html: string;
}

/**send a single mail to a single recipent */
export async function sendMail({ to, subject, html }: IMailContent) {
	const transporter = nodemailer.createTransport(
		awsTransport({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
		})
	);

	console.log(chalk.yellow.bgWhite('sending email to'), to);
	const info = await transporter.sendMail({
		from: 'kabootar@tmail.ws',
		to,
		subject,
		html,
	});

	console.log(info, chalk.green.bgWhite('email was sent'));
	// ses needs a 60 second gap
	// await new Promise(resolve => setTimeout(resolve, 60 * 1000));
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
