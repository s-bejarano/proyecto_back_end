import { query } from "express"
import {cartModel} from "../../models/Mongo/cart.js"
import productManagerM from "../Mongo/productos.js"


const productManager = new productManagerM()


export default class CartManagerM {


    constructor(){


    }

    createCart = async carrito => {

        let result = await cartModel.create(carrito)
        //res.status(201).json({result: "succes", payload: result})
        return result
    }

    getCart = async () => {

        try {
          //{_id: "649b10339264680582307afa"}
          let cart = await cartModel.find().populate("products")
           return cart
        }
        catch (err) {
                console.log("no es posible traer el carrito")
        }
    }

    DeleteCart = async (id) => {

        try {
            let result = await cartModel.deleteOne({_id: id})
        return result
        } catch (error) {
            console.log("no fue posible eliminar el carrito")
        }
        
    }

    deleteProdinCart = async (cartid,productid) => {

        try {
            const { products } = await cartModel.findOne(
                { _id: cartid },
                {
                  products: { $elemMatch: { id: productid } },
                }
              );

              await cartModel.updateOne(
                { _id: cartid },
                {
                  $pull: { products: { _id: productid } },
                  //$set: { total: newTotal },
                }
              );
              return products[0];
        
            //1const filtro = { _id: cartid}
          //2const filtro = { _id: cartid, id: productid}
          //2const update = { $unset: { products: productid}}
       //1 const update = { $pull: { products: {id: productid}}}
         // let result = await cartModel.updateOne(filtro, update)
          //  return result
        } catch (error) {
            console.log("no se pudo eliminar el producto del carrito" + error)
        }
        
    }
    getCartById = async (id) => {

        try { 
            // let id = req.params.id
             let carrito = await cartModel.findOne({ _id: id}).populate("products")
             return carrito
             //res.json({result: "succes", payload:  products})
         }
         catch (err) {
                 console.log("no es posible buscar el carrito")
         }
    }
    addProductInCart = async (cart_id,pid,product, cantidad) => {

        try {
            const { products } = await cartModel.findOne(
              { _id: cart_id },
              {
                products: { $elemMatch: { _id: product._id } },
              }
            ).populate("products");
            //.populate("products.producto");
            if (products.length > 0) {
              await this.deleteProdinCart(cart_id, product._id);
            }
           const cantidadT = product.incart + cantidad
    
            return await cartModel.findByIdAndUpdate(
              { _id: cart_id },
              { $push: { products: product }, cantidadT}
            );
          } catch (err) {
         //     throw new Error(err?.message);
            console.log("no es posible" + err)
          }
      
    }


    UpdateCart = async (cid, pid, productUpdate) => {

      try {
      //    let {id} = req.params;
        //  let productUpdate = req.body;
  
          let result = await ProductModel.updateOne({_id: cid, _id: pid}, productUpdate)
         // res.send({status: "succes", payload: result})
         return result
         
        } catch (error) {
          console.log("no fue posible actualizar el producto")
        }
  
  }

}



