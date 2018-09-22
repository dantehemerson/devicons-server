const http = require('http')
const createApp = require('./app')

const port = process.env.PORT || 5000

const startServer = () =>{
	const server = http.createServer(createApp())
	server.listen(port, console.log(`Listening on port ${port}, Ctrl+C to stop`))
}

startServer()