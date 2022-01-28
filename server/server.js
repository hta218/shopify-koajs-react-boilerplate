require('isomorphic-fetch');
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const koaServe = require('koa-static')
const { default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const { default: Shopify } = require('@shopify/shopify-api');
const apiRouter = require('@api/index')
const connectMongo = require('./db/connect-mongo')
const respond = require('koa-respond')
const { WHITELISTED_URLS, BUILD_DIR, configs } = require('@constants/index');
const afterAuth = require('@middlewares/afterAuth');
const handleError = require('@middlewares/handleError');
const verifyShopifyAuth = require('@middlewares/verifyShopifyAuth');

// Initializes Shopify
Shopify.Context.initialize(configs.SHOPIFY);

const app = new Koa()
connectMongo()

app.keys = [Shopify.Context.API_SECRET_KEY]

app.use(bodyParser({
	jsonLimit: "5mb"
}))

app.use(
	shopifyAuth({
		accessMode: 'offline',
		afterAuth
	})
)

app.use(respond({
	methods: {
		json: (ctx, payload, args) => {
			ctx.send(ctx.statusCode || 200, { success: 1, ok: true, payload, ...args })
		}
	}
}))

app.use(verifyShopifyAuth)
app.use(handleError)
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

/** Rewrite Cycle or History Api fallback for Single Page UI Applications
 * Works by catching the unresolved/unmatched routes and redirecting them to
 * index.html of the frontend app to get resolved through client side navigation eg: React-Router
 */
app.use(
	async (ctx, next) => {
		const url = ctx.url
		if (WHITELISTED_URLS.every(wu => !wu.test(url))) {
			ctx.path = 'index.html'
		}
		await koaServe(BUILD_DIR)(ctx, next)
	}
)

module.exports = app
