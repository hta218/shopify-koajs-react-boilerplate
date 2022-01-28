const { isNil, omitBy, pick } = require("lodash")
const Client = require("./_Client")

function queryProducts(variables) {
	const vars = omitBy(pick(variables, ['first', 'after', 'query']), isNil)
	if (vars.query) variables.query = `title:*${variables.query}*`
	vars.first = Number(vars.first) || 10

	return new Promise((resolve, reject) => {
		const query = `
			query queryProducts($first: Int, $after: String, $query: String)
				{
					products(first: $first, after: $after, query: $query) {
						edges {
							node {
								id
								title
								productType
								featuredImage {
									originalSrc
								}
								handle
								onlineStoreUrl
							}
							cursor
						}
						pageInfo {
							hasNextPage
							hasPreviousPage
						}
					}
				}
		`
		Client.shopify
			.graphql(query, vars)
			.then(resolve)
			.catch(reject)
	})
}

module.exports = {
	queryProducts,
}
