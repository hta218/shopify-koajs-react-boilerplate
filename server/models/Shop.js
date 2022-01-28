const mongoose = require('mongoose');
const chalk = require('chalk');

const shopSchema = new mongoose.Schema({
	shop: String,
	accessToken: String,
	scopes: String,
	active: {
		type: Boolean,
		default: true
	},
}, { timestamps: true })

const ShopModel = mongoose.model('Shop', shopSchema);

async function createShop(doc = {}) {
	return new Promise((resolve, reject) => {
		ShopModel
			.findOneAndUpdate({ shop: doc.shop }, doc, { upsert: true, new: true, setDefaultsOnInsert: true })
			.exec()
			.then(resolve)
			.catch(reject)
	})
}

async function findShop(filter) {
	return new Promise((resolve, reject) => {
		ShopModel
			.findOne(filter)
			.select('-accessToken')
			.then(foundShop => resolve(foundShop?.toObject?.()))
			.catch(reject)
	})
}

async function removeShop(shop = "") {
	return new Promise((resolve, reject) => {
		ShopModel
			.findOneAndUpdate({ shop }, { active: false }, { new: true })
			.exec()
			.then((_shop) => {
				console.log(chalk.green('[SERVER] [APP_UNINSTALLED] ') + `Shop: ${shop}`)
				resolve(_shop)
			})
			.catch(reject)
	})
}

async function getAccessToken(shop) {
	return new Promise((resolve, reject) => {
		ShopModel.findOne({ shop }, (err, shop) => {
			if (err) reject(err)
			resolve(shop.accessToken)
		})
	})
}

const Shop = {
	findShop, createShop, removeShop, getAccessToken
}

module.exports = Shop
