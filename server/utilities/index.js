const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const WHITELISTED_URLS = [
	/\/static\//,
	/.*\.json$/,
]

let BUILD_DIR = path.join(__dirname.replace('/server/utilities', '/client'), '/dist')
if (isProduction) {
	// Serve static built from React on production
	BUILD_DIR = path.join(__dirname.replace('/utilities', ''), '/build')
}

module.exports = {
	WHITELISTED_URLS,
	BUILD_DIR
}
