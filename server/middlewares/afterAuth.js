const Webhooks = require('@admin/Webhooks');
const { configs, cookiesSettings } = require('@constants/index');
const Shop = require('@models/Shop')
const jwt = require('jsonwebtoken')

async function afterAuth(ctx) {
	const { shop, accessToken } = ctx.state.shopify
	await Shop.createShop({
		shop, accessToken,
		active: true,
		scope: process.env.SHOPIFY_APP_SCOPES
	})

	const { TOKEN_COOKIE_NAME, TOKEN_LIFE } = configs
	const token = jwt.sign({ shop }, process.env.SHOPIFY_API_SECRET, { expiresIn: TOKEN_LIFE })
	ctx.cookies.set(TOKEN_COOKIE_NAME, token, cookiesSettings)
	ctx.redirect(`/?shop=${shop}`)

	Webhooks
		.registerWebhooks(shop, accessToken)
		.catch(err => ctx.throw(err.status || 500, err.message))
}

module.exports = afterAuth
