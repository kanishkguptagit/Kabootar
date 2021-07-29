const fs = require('fs');
const crypto = require('crypto');

function dotEnvDecrypter() {
	const fileContent = fs.readFileSync('tools/encode-env', { encoding: 'utf8' });

	// decrypt this using cryptojs

	const secret = 'kabootar-mails';
	const algo = 'aes-192-cbc';
	const key = crypto.scryptSync(secret, 'salt', 24);
	const iv = Buffer.alloc(16, 0);

	const decipher = crypto.createDecipheriv(algo, key, iv);
	let decryptedText = decipher.update(fileContent, 'base64', 'utf8');
	decryptedText += decipher.final('utf8');

	// make the file

	fs.writeFileSync('.env.production', decryptedText, { encoding: 'utf8' });

	console.log('\x1b[43m', '.env.production file created', '\x1b[0m \n');
}

dotEnvDecrypter();
