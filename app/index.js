const env = process.env
const express = require('express')
const path = require('path')
const devicons = require('devicon-2.2/devicon.json')
const fs = require('fs')
const Fuse = require('fuse.js/dist/fuse.min.js')

const isDev = !(env.NODE_ENV === 'production')

const createApp = () => {
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

	const app = express()

	app.disable('x-powered-by')
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'pug')

	app.use((req, res, next) => {
		app.locals.count = count
		app.locals.host = `${ isDev ? req.protocol : 'https'}://${ req.get('host') }`
		next()
	})

	app.get('/', (req, res) => {
		res.render('index', {
			icons
		})
	})

	app.get('/search/:query', (req, res) => {
		const query = req.params.query
		const options = {
			keys: ['name']
		}
		const fuse = new Fuse(icons, options)
		const filter = fuse.search(query)
		res.render('index', {
			icons: filter,
			query
		})
	})

	app.get('/json', (req, res) => {
		res.json(icons)
	})

	app.get('/:icon.svg', (req, res, next) => {
		const objIcon = icons.find(i => i.name == req.params.icon)
		if(!objIcon) {
			return res.status(404).send('Error 404: Icon Not Found')
		}
		res.type('image/svg+xml').send(objIcon.icon)
	})

	app.use(express.static('app/public'))

	return app
}

module.exports = createApp