import mongoose from "mongoose"
import productSchema from "./productos.js"
const cartCollection = "carrito"

const cartSchema = new mongoose.Schema({

    id: { type: String, require: true },
    products: {

        type: [
            {

            //    producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productos"
            //    },
            },
            
        ],
       // default: []   

    }
   
})

export const cartModel = mongoose.model(cartCollection, cartSchema )