export function getScheduledDate(dateString: string | undefined): Date {
	try {
		if (!dateString) {
			return new Date(Date.now());
		}
		const createdDate = new Date(dateString);
		if (createdDate instanceof Date && !isNaN(createdDate as any)) {
			return createdDate;
		} else {
			throw new Error('Date is not valid');
		}
	} catch (_e) {
		return new Date(Date.now());
	}
}
