import { Router } from "express";
import CartManagerM from "../../DAO/DBManagers/Mongo/cart.js";
import { ObjectId } from "mongoose";
import productManagerM from "../../DAO/DBManagers/Mongo/productos.js"
const carrito = new CartManagerM();
const producto = new productManagerM();
const VistaCarrito = Router()

VistaCarrito.post("/", async (req, res)=> {

    
    //if(!id)
    try {
        
        const {id } = req.body
       let result = {
            id,
            products: req.body
        }
        const result2 = await carrito.createCart(result)
        res.status(201).json({result: "succes", payload: result2})
    }
   
    catch (err){
        console.log("no fue posible crear el carrito" + err)
    }
})

VistaCarrito.post("/:id/products/:pid", async (req, res)=> {

    
    //if(!id) POST PRODUCTO EN CARRITO
    try {
        let id = req.params.id
        let pid = req.params.pid
        //const { params: { id, pid}  } = req.query;

        const product = await producto.getByYd(pid)
            const cart = await carrito.getCartById(id);

            if(!cart) {
                console.log("carrito no encontrado")
            }
       
            const result = await carrito.addProductInCart(id, product)
            res.status(201).json({result: "succes", payload: result})
       // const result2 = await cart.createCart(result)
       //  res.status(201).json({result: "succes", payload: result2})
    }
   
    catch (err){
        console.log("no fue posible añaadir el producto el carrito" + err)
    }
})

VistaCarrito.get("/", async (req, res)=> {

    try {
        let carrit = await carrito.getCart()
        res.json({result: "succes", payload:  carrit})
    } catch (error) {
        
    }
})

//GET POR ID 
VistaCarrito.get("/:id", async (req, res)=> {

    try {
        let id = req.params.id
        let products = await carrito.getCartById(id)
        res.json({result: "succes", payload:  products})
    }
    catch (err) {
            console.log("no es posible buscar el CARRITO")
    }
})


VistaCarrito.delete("/:id", async (req, res)=> {

    
    let {id} = req.params;
    let result = await carrito.DeleteCart({_id: id})
    res.send({status: "success", payload: result})
 })

 VistaCarrito.delete('/:cid/products/:pid', async(req, res)=>{

    let cartid = req.params.cid
    let productid = req.params.pid

    res.send(await carrito.deleteProdinCart(cartid,productid))
})


export default VistaCarrito