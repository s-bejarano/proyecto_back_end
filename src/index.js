import express from "express";
import ProductoR from "./router/product.routes.js"
import CartR from "./router/cart.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/productos",ProductoR)
app.use("/cart",CartR)

app.listen(8080, ()=>{

    console.log("servidor arriba en el puerto: 8080" );
});