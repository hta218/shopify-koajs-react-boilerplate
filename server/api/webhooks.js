const Router = require('koa-router')
const Shop = require('@models/Shop');
const { default: Shopify } = require('@shopify/shopify-api');

const router = new Router({ prefix: '/webhooks' })

router.use(async (ctx, next) => {
	/**
	 * Send reponse to Shopify immediately before attempting to do any background job
	 * Or webhooks will failed.
	 *
	 * */
	ctx.status = 200
	ctx.res.end()

	await next()
})

router.post("/uninstall", async (ctx) => {
	try {
		const shop = ctx.request.body?.myshopify_domain || ""
		if (shop) await Shop.removeShop(shop)

		await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
		console.log(`[WEBHOOKS PROCESSED] Webhook processed, returned status code 200 ${shop}`, ctx.res, ctx.req);
	} catch (err) {
		ctx.throw(500, `Failed to process webhook: ${err.message}`, err)
	}
});


/**
 * Shopify GDPR Webhooks refs:
 *
 * https://shopify.dev/concepts/trust-and-security/gdpr
 * https://community.shopify.com/c/Shopify-APIs-SDKs/Will-we-need-to-take-action-for-GDPR-webhooks/td-p/596710
 * https://community.shopify.com/c/Shopify-APIs-SDKs/Do-I-register-for-GDPR-Hooks/m-p/600086#M40621
 * https://community.shopify.com/c/Shopify-APIs-SDKs/Testing-GDPR-Hooks/td-p/579018#:~:text=If%20you%20log%20into%20your,ll%20be%20sent%20to%20you.
 * https://help.shopify.com/en/manual/your-account/privacy/GDPR/processing-gdpr-data-requests#process-subject-access-and-portability-requests
 */

router.post("/customers/data_request", async (ctx) => {
	ctx.json({ message: "No customers data stored!", storedData: [] })
})

router.post("/customer/redact", async (ctx) => {
	ctx.json({ message: "Customer data removed!" })
})

router.post("/shop/redact", async (ctx) => {
	ctx.json({ message: "Shop data removed!" })
})

module.exports = router
