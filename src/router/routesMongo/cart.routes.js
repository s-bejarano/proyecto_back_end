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
        let cantidad = req.body.cantidad
        //const { params: { id, pid}  } = req.query;

        const product = await producto.getByYd(pid)
            const cart = await carrito.getCartById(id);

            if(!cart) {
                console.log("carrito no encontrado")
            }
           
            

            const result = await carrito.addProductInCart(id,pid, product,cantidad)
            res.status(201).json({result: "succes", payload: result})

    }
   
    catch (err){
        console.log("no fue posible añadir el producto el carrito" + err)
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

VistaCarrito.put("/:cid/products/:pid", async (req, res)=> {

    try {
        let pid = req.params.pid;
        let cid = req.params.cid;
        let productUpdate = req.body;

        let result = await producto.Update({_id: cid, _id: pid}, productUpdate)
        res.send({status: "succes", payload: result})
       
      } catch (error) {
        console.log("no fue posible actualizar el producto")
      }
      
 })

VistaCarrito.post("/:cid/purchase", async (req,res)=> {
    let c_id = req.params.cid;
    const cart = await carrito.getCartById(c_id);
   // let detail = req.body;

    try {
        

        let result = await carrito.createticket(c_id)
        res.send({status:"succes",payload: result})
    } catch (error) {
        
        console.log("error al terminar la compra")
    }
})
export default VistaCarrito