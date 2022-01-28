const mongoose = require('mongoose');
const chalk = require('chalk');

const uri = {
	'production': process.env.MONGODB_URI,
	'development': process.env.MONGODB_URI_LOCAL,
}

const devEnv = process.env.NODE_ENV || 'development'

function connectMongo() {
	mongoose
		.connect(uri[devEnv], {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		.then(() => console.log(chalk.green('[MongoDB] Connect successfully! \n')))
		.catch(err => { throw err })
}

module.exports = connectMongo
