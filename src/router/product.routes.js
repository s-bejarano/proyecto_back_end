import { Router } from "express";
import ProductManager from "../controlador/productManager.js";

const producto = new ProductManager();
const ProductoR = Router()





//app.use(express.json());
//app.use(express.urlencoded({extended: true}));


ProductoR.get("/", async (req,res)=>{
   
    res.send(await producto.getProducts())

    /*
    const productos = await producto.getProducts()
  

    let limit = req.query.limit
    if (!limit || (limit > 5)) return res.send(productos)
    let cantidadproductos = productos.filter(productos => productos.id <= limit)
    res.send({ productos: cantidadproductos })
    */
})

ProductoR.get("/:id", async (req,res)=>{
    let id = req.params.id
    res.send(await producto.getProductsById(id))
})
ProductoR.post("/", async(req, res)=>{

    let nuevoProducto = req.body
    res.send(await producto.addProducts(nuevoProducto))

})

ProductoR.delete("/:id", async (req, res)=>{
    let id = req.params.id
    res.send(await producto.deleteProducts(id))
})

ProductoR.put("/:id", async (req, res) => {

    let id = req.params.id
    let actualizarproducto = req.body;

    res.send(await producto.updateProduct(id, actualizarproducto));
})

export default ProductoR