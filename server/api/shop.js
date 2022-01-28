const Shopify = require('@admin/Shopify')
const Router = require('koa-router')

const router = new Router({ prefix: '/shop' })

router.get('/', async (ctx, next) => {
	const shopData = await Shopify.getShopData()
	ctx.json(shopData)
})

router.get('/product', async (ctx, next) => {
	const products = await Shopify.queryProducts()
	ctx.json(products)
})

module.exports = router

