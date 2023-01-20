import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError } from '@sveltejs/kit';

SentryNode.init({
	dsn: 'https://5902fda1778e4144b54702ea77845c32@o4504226121121792.ingest.sentry.io/4504537706135552',
	tracesSampleRate: 1.0,
	// Add the Http integration for tracing
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag('svelteKit', 'server');

// use handleError to report errors during server-side data loading
export const handleError: HandleServerError = ({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: error instanceof Error && 'message' in error ? error.message : String(error)
	};
};
