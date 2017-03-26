var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var mensajes = [{usuario: "", mensaje: ""}];

// se especifica la carpeta donde estan los archivos estaticos
app.use(express.static('public'));

// cuando alguien se conecta a la socket (la pagina este abierta)
io.on('connection', function(socket){

	// se emite el evento mensajes con el arreglo mensajes
	socket.emit('mensajes', mensajes);

	// se escucha el evento enviado por el cliente
	socket.on("nuevoMensaje", function(datos){
		mensajes.push(datos);

		// se emite el evento a todos los clientes conectados al socket
		io.sockets.emit('mensajes', mensajes);
	});

});

// se inicia el servidor
server.listen(3000, function(){
	console.log("Servidor corriendo en http://localhost:3000");
});

// ES6
// server.listen(3000, () => console.log('servidor corriendo...'));