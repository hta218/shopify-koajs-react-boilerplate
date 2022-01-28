const { WEBHOOKS_API_PREFIX } = require('@constants/index');
const { WEBHOOKS_TOPICS } = require('@constants/index');
const { default: Shopify } = require('@shopify/shopify-api');
const chalk = require('chalk');

function registerWebhooks(shop, accessToken) {
	return new Promise(async (resolve, reject) => {
		const registerPromises = WEBHOOKS_TOPICS.map(async ({ topic, path }) => {
			return await Shopify.Webhooks.Registry.register({
				shop, accessToken, topic,
				path: `${WEBHOOKS_API_PREFIX}${path}`,
				webhookHandler: async (topic, shop, body) => {
					console.log(chalk.green(`[WEBHOOKS ${topic}]`) + ` Shopify call webhookHandler ${shop} - ${topic} - ${body}`)
				},
			})
		})

		await Promise.all(registerPromises).then(resolve).catch(reject)
	})
}

const Webhooks = {
	registerWebhooks
}

module.exports = Webhooks
