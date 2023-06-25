
import {cartModel} from "../../models/Mongo/mensajes.js"

export default class MensajesManagerM {


  constructor(){
    
  }


    async #getMaxId() {

      let maxId  = 0;
      const msgs = await this.getAll()

  }
  createMensaje = async(obj) => {

    // const {id,title, description, category, price, stock} = req.body
     //if(!id)
  
     try { 
        let result = await cartModel.create(obj)
         //res.status(201).json({result: "succes", payload: result})
         return result
     }
    
     catch (err){
         console.log("no fue posible guardar el mensaje" + err)
     }
 }
  getAll = async()=> {

    let result = await cartModel.find()
    return result

  }
/*
  async createMensaje(obj) {
    try {
      const msg = {
        id: 1,
        ...obj
      }
      //const msgFile = await this,getAll()
      let result = await cartModel.create(msg)
      return result

    } catch (error) {
      console.log("error " + error)
    }
  }*/

  
}