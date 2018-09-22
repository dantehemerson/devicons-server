const createApp = require('./app')

const startServer = () =>{
	const app = createApp()
	app.listen(5000, console.log('Listening on http://localhost:5000'))
}

startServer()