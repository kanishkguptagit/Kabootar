export function getScheduledDate(dateString: string | undefined): string {
	try {
		if (!dateString) {
			return new Date().toISOString();
		}
		const createdDate = new Date(dateString);
		if (createdDate instanceof Date && !isNaN(createdDate as any)) {
			return createdDate.toISOString();
		} else {
			throw new Error('Date is not valid');
		}
	} catch (_e) {
		return new Date().toISOString();
	}
}
