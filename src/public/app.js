const socket = io()



let username = null
if(!username){

    Swal.fire({
        title: "Bienvenido al chat",
        text: "inserta tu nombre de usuario",
        input: 'text',
        inputValidator: (value) => {

            if(!value) {
                return "El usuario es requerido"
            }
        }
    })
    .then((input) => {
        username = input.value;
        socket.emit('newuser', username)
    })
}



const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', ()=> {
    socket.emit('chat:message', {
        username,
        message: message.value,
    })
    message.value = '';
});


socket.on('messages', (data) => {

    actions.innerHTML = '';
    const chatRender = data.map ((msg) => {
        return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`
    }).join(' ')
    output.innerHTML = chatRender
})

socket.on('newUser', (username)=> {

    Toastify({
        text: `${username} se ha logeado`,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function() {}
    }).showToast();
})

message.addEventListener('keypress', () => {
    socket.emit('chat: typing', username);
})

socket.on('chat:typing', (data)=> {
    console.log(data)
    actions.innerHTML = `<p><en>${data} esta escribiendo un mensaje...</en></p>`
})

//const socketServer = new Server(httpServer)
/*
socket.on('connect', () => {

    console.log("client connected by sockets")
   /* socket.on('disconnected', ()=> {
        console.log("Cliente disconnected")
    })
    
    socket.emit("message","hola mundo")
})

*/
