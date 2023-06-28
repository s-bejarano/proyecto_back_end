import { query } from "express";
import { ProductModel } from "../../models/Mongo/productos.js";

export default class productManagerM {

    constructor(){


    }


    getAll = async (page, limit,category, q) => {

        /*let products = await ProductModel.find()
        return products.map(product => product.toObject())*/
        try {
            //let page = req.query.page
            //let limit = req.query.
            const limitRecords = parseInt(limit);
            const skip = (page -1) * limit;

            let query = {};
            if(q) {
              query = {$text: {$search: q}};
            }
            if(category) query.category = category;

          //  let products = await ProductModel.paginate({page: page , limit: limit })
            let products = await ProductModel.find(query).limit(limitRecords).skip(skip).lean()
            //paginate({category: "super"},{limit:10, page:1})
            //paginate({page: page , limit: limit })
           return products
        }
        catch (err) {
                console.log("no es posible traer los productos")
        }

    }

    createProduct = async(product) => {

       // const {id,title, description, category, price, stock} = req.body
        //if(!id)
     
        try { 
           let result = await ProductModel.create(product)
            //res.status(201).json({result: "succes", payload: result})
            return result
        }
       
        catch (err){
            console.log("no fue posible crear el producto" + err)
        }
    }

    getByYd = async (id) => {


        try {
           // let id = req.params.id
            let products = await ProductModel.findOne({ _id: id})
            return products
            //res.json({result: "succes", payload:  products})
        }
        catch (err) {
                console.log("no es posible buscar el producto")
        }
    
    }

    Update = async (id, productUpdate) => {

        try {
        //    let {id} = req.params;
          //  let productUpdate = req.body;
    
            let result = await ProductModel.updateOne({_id: id}, productUpdate)
           // res.send({status: "succes", payload: result})
           return result
           
          } catch (error) {
            console.log("no fue posible actualizar el producto")
          }
    
    }
    

    Delete = async (id) => {

        try {
            let result = await ProductModel.deleteOne({_id: id})
        return result
        } catch (error) {
            console.log("no fue posible eliminar el producto")
        }
        
    }

    
} 