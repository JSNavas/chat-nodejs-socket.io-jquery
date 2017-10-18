// ES6
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

let mensajes = [
	{
		usuario: "",
		mensaje: ""
	}
]

app.use(express.static('public'))


// cuando alguien se conecta a la socket (la pagina este abierta)
io.on('connection', (socket) => {

	// se emite el evento mensajes con el arreglo mensajes
	socket.emit('mensajes', mensajes)

	// se escucha el evento enviado por el cliente
	socket.on('nuevoMensaje', (data) => {
		mensajes.push(data)

		// se emite el evento a todos los clientes conectados al socket
		io.sockets.emit('mensajes', mensajes)
	})
})

//Run server
server.listen(3000, () => {
	console.log("Server run port 3000")
})
