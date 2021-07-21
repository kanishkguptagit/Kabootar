import { IMailTrack } from '../../models/MailTrack.model';

const linkRE = /(<a\s+(?:[^>]*?\s+)?href=")([^"]*)(")/gi;
const BASE_URL = 'https://kabootar-mail.herokuapp.com';

export function patchLinks(html: string, mailTrackId: IMailTrack['_id']): string {
	return html.replace(
		linkRE,
		(_, first, link, end) => `${first}${BASE_URL}/mail-track/url/${mailTrackId}/${link}${end}`
	);
}

export function addBlankImage(html: string, mailTrackId: IMailTrack['_id']): string {
	const imgTag = `<img src="${BASE_URL}/mail-track/open/${mailTrackId}" />`;

	if (new RegExp(/<\/body>/).test(html)) {
		html = html.replace(/<\/body>/, `${imgTag}</body>`);
	} else {
		html = `${html}${imgTag}`;
	}

	return html;
}
