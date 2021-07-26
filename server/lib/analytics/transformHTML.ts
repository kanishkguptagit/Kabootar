import { IMailTrack } from '../../models/MailTrack.model';
import { encodeData } from './jwt';

const linkRE = /(<a\s+(?:[^>]*?\s+)?href=")([^"]*)(")/gi;
const BASE_URL = process.env.BASE_URL ?? 'https://kabootar-mail.herokuapp.com';

export function patchLinks(html: string, encodedJWT: string): string {
	return html.replace(
		linkRE,
		(_, first, link, end) => `${first}${BASE_URL}/mail-track/url/${encodedJWT}/${link}${end}`
	);
}

export function addBlankImage(html: string, encodedJWT: string): string {
	const imgTag = `<img src="${BASE_URL}/mail-track/open/${encodedJWT}" />`;

	if (new RegExp(/<\/body>/).test(html)) {
		html = html.replace(/<\/body>/, `${imgTag}</body>`);
	} else {
		html = `${html}${imgTag}`;
	}

	return html;
}

export function transformHTML({ recipent, mailTrackId, body }: ITransformHTML): string {
	const encodedJWT = encodeData({ recipent, mailTrackId });
	return addBlankImage(patchLinks(body, encodedJWT), encodedJWT);
}

export interface IHiddenData {
	recipent: string;
	mailTrackId: IMailTrack['_id'];
}

interface ITransformHTML extends IHiddenData {
	body: string;
}
