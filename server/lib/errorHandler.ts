import { Request, Response } from 'express';

export default function errorHandler(err: Error | undefined | null, _req: Request, res: Response) {
	if (!err || !err.message) {
		return res.status(500).json({ success: false, result: 'Server internal error.' });
	}

	return res.status(400).json({
		success: false,
		result: err.message,
	});
}
