import nodemailer from 'nodemailer';

async function run() {
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
	const info = await transporter.sendMail({
		from: 'BlueBird', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'the main mars', // plain text body
		html: '<strong><em>himmat</em></strong>', // html body
	});

	console.log('message sent', info.messageId);

	console.log('this  %s is the preview url', nodemailer.getTestMessageUrl(info));
}

run();
