const { getShopData } = require("./Shop")
const { queryProducts } = require("./Products")

const Shopify = {
	queryProducts,
	getShopData
}

module.exports = Shopify
