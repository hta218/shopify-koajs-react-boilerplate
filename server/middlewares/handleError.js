const chalk = require("chalk")
const { omitBy, isNil } = require("lodash")

async function handleError(ctx, next) {
	try {
		await next()
	} catch (err) {
		const { path, method } = ctx
		const { status = 500, message = "Internal Server Error", requireAuth, shouldRefresh } = err

		console.log(chalk.bold.red.inverse('\nERROR'), chalk.bold.red(`${method} ${path} - ${status} ${err.message}\n`))

		const errData = omitBy({ status, message, requireAuth, shouldRefresh }, isNil)
		ctx.send(status, { success: 0, ok: false, ...errData })
	}
}

module.exports = handleError
