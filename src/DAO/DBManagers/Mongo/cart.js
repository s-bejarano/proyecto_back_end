import { query } from "express"
import { cartModel } from "../../models/Mongo/cart.js"
import productManagerM from "../Mongo/productos.js"
import { ProductModel } from "../../models/Mongo/productos.js";
import {ticketModel} from "../../models/Mongo/ticket.js"
import usuarioModel from "../../models/Mongo/usuarios.js";
import logger from "../../../utils/logger/logger.js";


const productManager = new productManagerM()


export default class CartManagerM {


  constructor() {


  }

  createCart = async carrito => {

    try {
      let result = await cartModel.create(carrito)
      //res.status(201).json({result: "succes", payload: result})
      logger.info("carrito creado con exito")
      return result
    } catch (error) {
      console.log(error)
      logger.debug(error)
      logger.error("no es posible crear el carrito")
    }
   
  }

  createticket = async (cid,email) => {
   
    let carrito = await cartModel.findOne({ _id: cid })
      
    const products = carrito.products;

    try {
     

for (const productId of products) {

        try {
          let producto = await ProductModel.findOne({ _id: productId })
        //  const cantidadEnCarrito = producto.incart
          const total = producto.incart * producto.price
          console.log(total)
          // let result1 = await ProductModel.updateOne({_id: productId},{ $inc: {  stock: -cantidadEnCarrito}} )

          if (producto.stock > producto.incart) {

            let result1 = await ProductModel.updateMany(
              { _id: { $in: products } },
              [
                {
                  $set: {
                    stock: {
                      $subtract: ["$stock", "$incart"]
                    }
                  }
                }
              ]
            );
  
          
  
            let compra = {
  
              "id_carrito": cid,
         
              
              "amount": total,
              "email": ""
            }
      
             let result2 = await ticketModel.create(compra)
             logger.info("ticket creado con exito")
             return result1 && result2
          } else {
            logger.warning("Stock insuficiente")
          }
         

        } catch (error) {
          console.log(error)
          logger.debug(error)
          logger.warning("No es posible actualizar el stock")
          
        }

      }

 
      
      

    } catch (error) {
      logger.error("error al crear el ticket en la base de datos")
      logger.debug(error)
    }


  }

  getCart = async () => {

    try {
      //{_id: "649b10339264680582307afa"}
      let cart = await cartModel.find().populate("products")
       logger.info("Carritos  totales consultados")
      return cart 
    }
    catch (err) {
      logger.error("no es posible consultar los carritos en la base de datos")
      logger.debug(err)
    }
  }

  DeleteCart = async (id) => {

    try {
      let result = await cartModel.deleteOne({ _id: id })
      logger.info("Carrito eliminado con exito")
      return result
    } catch (error) {
      logger.error("no es posible eliminar los carritos")
      logger.debug(error)
    }

  }
  deleteProdinCart = async (cartid, productid) => {

    try {
      const { products } = await cartModel.findOne(
        { _id: cartid },
        {
          products: { $elemMatch: { _id: productid } },
        }
      );

      await cartModel.updateOne(
        { _id: cartid },
        {                                                                                                                                                                                                                                                    
          $pull: { products: { _id: productid } },
          //$set: { total: newTotal },
        }
      );
      logger.info("producto eliminado de carrito con exito")

      return products[0];


    } catch (error) {
      logger.debug(error)
      logger.error("no es posible eliminar el producto del carrito")
    }

  }
  
  getCartById = async (id) => {

    try {
      // let id = req.params.id
      let carrito = await cartModel.findOne({ _id: id }).populate("products")
      logger.info("carrito especifico consultado con exito")
      return carrito
      //res.json({result: "succes", payload:  products})
    }
    catch (err) {
 
    logger.debug(err)
    logger.error("no es posible buscar el carrito especifico")
    }
  }
  addProductInCart = async (cart_id, pid, product, cantidad) => {

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
      logger.info("producto añadido al carrito con exito")
      return await cartModel.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, cantidadT }
      );
    } catch (err) {
      //     throw new Error(err?.message);
      logger.debug(err)
      logger.error("no es posible agregar el producto al carrito")
    }

  }


  UpdateCart = async (cid, pid, productUpdate) => {

    try {
      //    let {id} = req.params;
      //  let productUpdate = req.body;

      let result = await ProductModel.findByIdAndUpdate({ _id: cid, _id: pid }, productUpdate)
      // res.send({status: "succes", payload: result})
      logger.info("carrito actualizado con exito")
      return result

    } catch (error) {
      
      logger.debug(error)
      logger.error("erro al actualizar el carrito")
    }

  }

}



