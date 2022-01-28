const chalk = require('chalk')
const crypto = require('crypto')

async function verifyShopifyWebhooks(ctx, next) {
	try {
		const topic = ctx.request.headers['x-shopify-topic']
		const shop = ctx.request.headers['x-shopify-shop-domain']
		const hmac = ctx.request.headers['x-shopify-hmac-sha256']

		console.log(`${chalk.green('[WEBHOOK]')} ${chalk.grey(`[${shop}]`)} - /${topic}`, ctx.request.body)

		const data = ctx.request.rawBody
		let error = ""
		let verified = false

		if (!hmac || !shop || !topic) {
			error = "Webhook must originate from Shopify!"
		}

		if (!error) {
			const genHash = crypto
				.createHmac('sha256', process.env.SHOPIFY_API_SECRET)
				.update(data)
				.digest('base64')
			verified = genHash === hmac
			if (!verified) error = "Couldn't verify incomming Webhook request!"
		}

		if (error) throw (error)
		ctx.shop = shop
	} catch (err) {
		ctx.throw(err.status || 401, err?.message || err)
	}
	await next()
}

module.exports = verifyShopifyWebhooks
