// ES6
const socket = io.connect()

$(document).ready(() => {
	socket.on('mensajes', render)
	$('#enviar').click(sendMsj)
})

const render = (data) => {
	const html = data.map((data, index) => {
		return(`
			<div class="mensaje">
				<strong>${data.usuario}</strong>
				<p>${data.mensaje}</p>
			</div>
		`)
	}).join('')
	const divChat = document.getElementById('chat')
	divChat.innerHTML = html
	divChat.scrollTop = divChat.scrollHeight

	$('#mensaje').val('')
}

const sendMsj = () => {
	const user = $('#usuario').val()
	const msj = $('#mensaje').val()

	if (user != '' && msj != '') {
		let data = {
			usuario: user,
			mensaje: msj
		}

	socket.emit('nuevoMensaje', data)

	return false
	} else {
		alert('Los campos no pueden estar vacios!')
	}
}
