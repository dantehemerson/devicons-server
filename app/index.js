const express = require('express')
const path = require('path')
const devicons = require('devicon-2.2/devicon.json')
const fs = require('fs')

let icons = []
let count = 0

devicons.forEach(icon => {
	count += icon.versions.svg.length
	icon.versions.svg.forEach(type => {
		let ico = {}
		ico['name'] = `${icon.name}-${type}`
		ico['icon'] = fs.readFileSync(
			require.resolve(`devicon-2.2/icons/${icon.name}/${ico['name']}.svg`),
			'utf-8'
		)
		icons.push(ico)
	})
})

const createApp = () => {
	const app = express()

	app.disable('x-powered-by')
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'pug')

	app.use((req, res, next) => {
		res.locals.count = count
		next()
	})

	app.get('/', (req, res) => {
		res.render('index')
	})

	app.get('/json', (req, res) => {
		res.json(icons)
	})

	app.use(express.static('app/public'))

	return app
}

module.exports = createApp