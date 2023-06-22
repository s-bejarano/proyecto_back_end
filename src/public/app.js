const socket = io()

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

let username = null
if(!username){

    Swal.fire({
        title: "Bienvenido al chat",
        text: "inserta tu nombre de usuario",
        input: 'text',
        inputValidator: (value) => {

            if(!value) {
                return "el usuario es requerido"
            }
        }
    })
    .then((input) => {
        username = input.value;
        socket.emit('newuser', username)
    })
}