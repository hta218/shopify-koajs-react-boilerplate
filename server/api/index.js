const Router = require('koa-router')
const { configs, cookiesSettings } = require('@constants/index')
const jwt = require('jsonwebtoken')
const shopRouter = require('./shop')
const webhooksRouter = require('./webhooks')
const verifyRequest = require('@middlewares/verifyRequest')
const verifyShopifyWebhooks = require('@middlewares/verifyShopifyWebhooks');
const Client = require('@admin/_Client');

const router = new Router({ prefix: '/api' })

router.use(verifyShopifyWebhooks, webhooksRouter.routes())

router.use(verifyRequest)

// Generate new token
router.get("/credentials", async (ctx) => {
	try {
		const { shop } = ctx
		const { TOKEN_COOKIE_NAME, TOKEN_LIFE } = configs

		const token = jwt.sign({ shop }, process.env.SHOPIFY_API_SECRET, { expiresIn: TOKEN_LIFE })
		ctx.cookies.set(TOKEN_COOKIE_NAME, token, cookiesSettings)

		ctx.json({ message: "Authorized!", shop })
		await Client.createAPIClients(ctx.shop)
	} catch (err) {
		ctx.throw(401, `Unauthorized - ${err.toString()}`, { requireAuth: true })
	}
})

router.use(shopRouter.routes())

module.exports = router
