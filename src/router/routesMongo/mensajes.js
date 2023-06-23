import { Router } from "express";
import MensajesManagerM from "../../DAO/DBManagers/Mongo/mensajes.js"

const ChatR = Router()
const MensajesManager = new MensajesManagerM()


ChatR.get("/", async (req,res) =>{
    // let ProductosT = await producto.getProducts()
    let nuevoMnensaje = req.body
    let result = await MensajesManager.createMensaje(nuevoMnensaje)
     res.render("chat", {
 
        // tittle: "productos",
         mensajes: result
     })
 })

export default ChatR