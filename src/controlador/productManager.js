import { Router } from 'express';
import { promises as fs } from 'fs'
import { nanoid } from "nanoid"





class ProductManager {

    constructor() {

        this.path = "./src/models/productos.json"
    }

    read = async () => {

        let productos = await fs.readFile(this.path, "utf-8");
        return JSON.parse(productos);

    }

    write = async (product) => {

        await fs.writeFile(this.path, JSON.stringify(product));

    }

    /*
        let idCounter = 0;
        function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
};*/
    addProducts = async (product) => {

        let productosexistentes = await this.read();
        product.id = nanoid(3)

        let productoTotal = [...productosexistentes, product];
        await this.write(productoTotal);

        return "producto agregado";
        //console.log(productsP)

    };
    getProducts = async () => {

        return await this.read();

    };

    getProductsById = async (id) => {
      //  let products = await this.read();
        let productoporId = await  this.exist(id)//products.find(producto => producto.id === id)
        if(!productoporId) return "Producto no existe"
        return productoporId
    };

    deleteProducts = async (id) => {

        let products = await this.read();
        let productoexistente = products.some(producto => producto.id === id)
        if(productoexistente) {
            let filtrodeproductos = products.filter(producto => producto.id != id)
            await this.write(filtrodeproductos)
            return "producto eliminado"
        }
        return "producto no encontrado"
    

    };

    exist = async (id) => {
            let products = await this.read();
            return products.find(producto => producto.id === id )
         

    };


    updateProduct = async (id, product) => {

        let productoporId = await  this.exist(id)
        if(!productoporId) return "Producto no existe"
        await this.deleteProducts(id)
        let productoantiguo = await this.read()
        let products = [{id : id, ...product }, ...productoantiguo]
        await this.write(products)
        return "producto actualizado"
        
    };
}

export default ProductManager

//const product = new ProductManager()

//product.write()