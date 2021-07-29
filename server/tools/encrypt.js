const fs = require('fs');
const crypto = require('crypto');

function dotEnvEncrypter() {
	const fileContent = fs.readFileSync('.env.production', { encoding: 'utf8' });

	// encrypt this using crypto

	const secret = 'kabootar-mails';
	const algo = 'aes-192-cbc';
	const key = crypto.scryptSync(secret, 'salt', 24);
	const iv = Buffer.alloc(16, 0);

	const cipher = crypto.createCipheriv(algo, key, iv);
	let encryptedText = cipher.update(fileContent, 'utf8', 'base64');
	encryptedText += cipher.final('base64');

	// make the file

	fs.writeFileSync('./tools/encode-env', encryptedText, { encoding: 'utf8' });

	console.log('\x1b[43m', 'encode-env file created', '\x1b[0m \n');
}

dotEnvEncrypter();
