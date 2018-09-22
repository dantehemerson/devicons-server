const http = require('http')
const createApp = require('./app')

const startServer = () =>{
	const server = http.createServer(createApp())
	server.listen(5000, console.log('Listening on http://localhost:5000'))
}

startServer()