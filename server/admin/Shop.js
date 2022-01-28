const Client = require("./_Client")

function getShopData() {
	return new Promise((resolve, reject) => {
		Client.shopify
			.shop
			.get()
			.then(resolve)
			.catch(reject)
	})
}

module.exports = {
	getShopData
}
