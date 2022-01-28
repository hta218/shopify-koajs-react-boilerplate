const chalk = require('chalk');
const MoneiAPI = require('shopify-api-node');
const { default: ShopifyAPI } = require('@shopify/shopify-api');
const Shop = require('@models/Shop');

const Client = {
	shop: '',
	shopify: null,
	rest: null,
	createAPIClients: async function (shop) {
		try {
			if (!shop) throw new Error("Missing shop!")
			if (shop !== this.shop) {
				const accessToken = await Shop.getAccessToken(shop)
				if (!accessToken) throw new Error("Unknown shop!")

				this.shopify = new MoneiAPI({ shopName: shop, accessToken })
				this.rest = new ShopifyAPI.Clients.Rest(shop, accessToken);

				this.shop = shop
				console.log(`${chalk.green('[API CLIENT]')} Shopify API Clients created!`)
			}
		} catch (err) {
			throw new Error(`Failed to create Shopify API Clients: ${err.toString()}`)
		}
	}
}

module.exports = Client
