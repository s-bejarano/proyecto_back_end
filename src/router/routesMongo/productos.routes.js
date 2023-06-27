import { Router } from "express";

import productManagerM from "../../DAO/DBManagers/Mongo/productos.js"
import productos from "../../DAO/models/Mongo/productos.js";



const producto = new productManagerM();
const productosVista = Router()

productosVista.get("/", async (req,res) =>{
    let ProductosT = await producto.getAll()
    res.render("products", {

        tittle: "productos",
        productos: ProductosT
    })
})


export default productosVista