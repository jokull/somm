import type { HandleServerError } from '@sveltejs/kit';
import { Toucan } from 'toucan-js';

// use handleError to report errors during server-side data loading
export const handleError: HandleServerError = ({ error, event }) => {
	const sentry = new Toucan({
		dsn: 'https://5902fda1778e4144b54702ea77845c32@o4504226121121792.ingest.sentry.io/4504537706135552',
		request: event.request
	});

	sentry.captureException(error);

	return {
		message: error instanceof Error && 'message' in error ? error.message : String(error)
	};
};
