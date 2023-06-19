const socket = io()

//const socketServer = new Server(httpServer)

socket.on('connect', () => {

    console.log("client connected by sockets")
   /* socket.on('disconnected', ()=> {
        console.log("Cliente disconnected")
    })*/

    
})

socket.emit("message","hola mundo")