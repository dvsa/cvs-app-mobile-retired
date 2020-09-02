import { AppConfig } from '../config/app.config';

export const sentryFile = `
defaults.url=${AppConfig.SENTRY_URL}
defaults.org=${AppConfig.SENTRY_ORG}
defaults.project=${AppConfig.SENTRY_PROJECT}
auth.token=${AppConfig.SENTRY_AUTH_TOKEN}
cli.executable=${AppConfig.SENTRY_CLI_EXECUTABLE}
`;
