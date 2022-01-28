require('dotenv').config()
require('module-alias/register')
const chalk = require('chalk')
const app = require('./server')
const https = require('https')
const fs = require('fs')
const path = require('path')

let certOptions = null
try {
	certOptions = {
		key: fs.readFileSync(path.resolve('certs/server.key')),
		cert: fs.readFileSync(path.resolve('certs/server.crt'))
	}
} catch(err) {
	console.log(`\n${chalk.yellowBright('[WARNING]')} No certificate files found! If you wish to use https in your local development, generate and move cert files to ${chalk.green('server/certs/')} \nIf not, ignore this warning!`)
}

const host = process.env.SHOPIFY_APP_URL.replace(/^https:\/\//, '')
const isLocal = host === 'localhost'
const enableHTTPSInLocal = Boolean(isLocal && certOptions)

const port = enableHTTPSInLocal ? 443 : process.env.PORT || 5000
const protocol = (isLocal && !certOptions) ? "http" : "https"

const url = `${protocol}://${host}${isLocal ? `:${port}` : ''}`

const callback = () => {
	console.log(chalk.green(`\nApp start successfully at ${chalk.underline(url)} \n`))
}

if (enableHTTPSInLocal) {
	https.createServer(certOptions || {}, app.callback()).listen(port, callback)
} else {
	app.listen(port, callback)
}

