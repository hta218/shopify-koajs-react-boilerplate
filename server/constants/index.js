const path = require('path');
const { ApiVersion } = require('@shopify/shopify-api');

const isProduction = process.env.NODE_ENV === 'production';

const WHITELISTED_URLS = [
	/\/static\//,
	/.*\.json$/,
]

const ancentorPath = path.basename(path.dirname(module.filename))
let BUILD_DIR = path.join(__dirname.replace(`/server/${ancentorPath}`, '/client'), '/dist')
if (isProduction) {
	// Serve static built from React on production
	BUILD_DIR = path.join(__dirname.replace(`/${ancentorPath}`, ''), '/build')
}

const configs = {
	SHOPIFY: {
		API_KEY: process.env.SHOPIFY_API_KEY,
		API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
		SCOPES: process.env.SHOPIFY_APP_SCOPES,
		HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/^https:\/\//, ''),
		API_VERSION: ApiVersion.April21,
		IS_EMBEDDED_APP: false,
	},
	CORS: {
		origin: `https://${process.env.SHOPIFY_APP_URL}`,
		allowMethods: ['HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
		allowHeaders: ['Content-Type', 'Authorization'],
		exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
	},
	TOKEN_COOKIE_NAME: "your-unique-cookie-name-for-jwt",
	TOKEN_LIFE: "14d",
	COOKIE_LIFE: 7 * 24 * 60 * 60 * 1000, // 14 days
}

const cookiesSettings = {
	maxAge: configs.COOKIE_LIFE,
	overwrite: true,
	secure: true,
	httpOnly: true,
	sameSite: "strict"
}

const WEBHOOKS_API_PREFIX = '/api/webhooks'
const WEBHOOKS_TOPICS = [
	{ topic: 'APP_UNINSTALLED', path: `/uninstall` },
	{ topic: 'THEMES_CREATE', path: `/theme/create` },
	{ topic: 'THEMES_PUBLISH', path: `/theme/publish` },
	{ topic: 'THEMES_UPDATE', path: `/theme/update` },
	{ topic: 'THEMES_DELETE', path: `/theme/delete` },
]

module.exports = {
	WHITELISTED_URLS,
	BUILD_DIR,
	configs,
	cookiesSettings,
	WEBHOOKS_API_PREFIX,
	WEBHOOKS_TOPICS
}
