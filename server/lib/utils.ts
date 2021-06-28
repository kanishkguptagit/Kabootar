export function getScheduledDate(dateString: string | undefined): Date {
	try {
		if (!dateString) {
			return new Date(Date.now());
		}
		return new Date(dateString);
	} catch (e) {
		return new Date(Date.now());
	}
}
