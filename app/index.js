const express = require('express')
const path = require('path')

const createApp = () => {
	const app = express()

	app.disable('x-powered-by')
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'pug')

	app.get('/', (req, res) => {
		res.render('index')
	})

	return app
}

module.exports = createApp