import nodemailer from 'nodemailer';
import { sendMail } from 'nodemailer-mail-tracking';
import { MailTrackOptions } from 'nodemailer-mail-tracking/src/types';

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

export async function run() {
	const testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	const info = await sendMail(mailTrackOptions, transporter, {
		from: 'BlueBird', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'tick ', // Subject line
		text: 'the main mars', // plain text body
		messageId: 'fast-diet',
		html: '<strong><em>himmat</em></strong>', // html body
	});

	console.log('the url is', nodemailer.getTestMessageUrl(info[0].result));
}
