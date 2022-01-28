const { configs } = require('@constants/index');
const Shop = require("@models/Shop");
const jwt = require('jsonwebtoken')

async function verifyRequest(ctx, next) {
	const { TOKEN_COOKIE_NAME } = configs
	const token = ctx.cookies.get(TOKEN_COOKIE_NAME)

	try {
		if (!token) {
			throw new Error("Forbidden - Missing token!")
		}

		const { shop } = jwt.verify(token, process.env.SHOPIFY_API_SECRET)
		const savedShop = await Shop.findShop({ shop })
		if (!savedShop || !savedShop.active) {
			throw new Error("Shop not found or App has been uninstalled on this Shop!")
		}

		ctx.app.context.shop = shop
	} catch (err) {
		return ctx.throw(err.status || 401, err.message || err, { requireAuth: true })
	}
	await next()
}

module.exports = verifyRequest

