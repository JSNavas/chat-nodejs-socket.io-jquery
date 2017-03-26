// se envia la respuesta 'connection' a io.on que se estableció una conexion
var socket = io.connect();

$(document).ready(function(){
	socket.on('mensajes', render);

	$("#enviar").click(enviarMensaje);
});

function render(datos){
	var html = datos.map(function(data, index){
		return (`<div class="mensaje">
					<strong>${data.usuario}</strong>
					<p>${data.mensaje}</p>
				</div>`);
	}).join(" ");

	var divChat = document.getElementById('chat');
	divChat.innerHTML = html;
	divChat.scrollTop = divChat.scrollHeight;

	// se limpian los inputs
	$("#mensaje").val("");
}

var enviarMensaje = function(){
	var usuario = document.getElementById('usuario').value;
	var mensaje = document.getElementById('mensaje').value;

	if(usuario != "" && mensaje != ""){
		var datos = {
			usuario: usuario,
			mensaje: mensaje
		};

		// se emite el evento nuevoMensaje
		socket.emit('nuevoMensaje', datos);

		return false;
	}else{
		alert('Los campos no pueden estar vacios!');
	}

}