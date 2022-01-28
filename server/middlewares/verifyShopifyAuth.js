const crypto = require('crypto')
const chalk = require("chalk");

async function verifyShopifyAuth(ctx, next) {
	console.log(chalk.green('[SERVER]') + ` ${ctx.method} ${ctx.url}`)

	const { hmac, ...rest } = ctx.query;
	if (!hmac) {
		return await next()
	}
	try {
		const keys = Object.keys(rest).sort();
		const message = keys.map(key => `${key}=${rest[key]}`).join('&');
		const generated = Buffer.from(crypto.createHmac('sha256', process.env.SHOPIFY_API_SECRET).update(message).digest('hex'), 'hex');
		const shopify = Buffer.from(hmac, 'hex');

		if (!crypto.timingSafeEqual(shopify, generated)) {
			throw new Error("Hmac not equal!")
		}
		ctx.redirect(`/auth?shop=${rest.shop}`);
	} catch(err) {
		await next()
	}
}

module.exports = verifyShopifyAuth
