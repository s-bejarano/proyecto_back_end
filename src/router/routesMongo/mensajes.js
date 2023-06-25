import { Router } from "express";
import MensajesManagerM from "../../DAO/DBManagers/Mongo/mensajes.js"

const ChatR = Router()
const MensajesManager = new MensajesManagerM()


/*
ChatR.post("/",async (req,res)=> {

    const { usuario,mensaje } = req.body;

    let result = await MensajesManager.createMensaje({usuario, mensaje})
    res.json({result: "succes", payload:  result})

  
    
    
})*/


ChatR.get("/", async (req,res) =>{
    //const { usuario,mensaje } = req.body;

    //let result = await MensajesManager.createMensaje({usuario, mensaje})
//    res.json({result: "succes", payload:  result})

     res.render("chat")

 })

export default ChatR