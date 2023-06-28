import CartManagerM from "../DAO/DBManagers/Mongo/cart.js"


const producto = CartManagerM();
const btn = document.getElementById('agregar');
const idp = document.getElementById('idp')
const idc = "649b10339264680582307afa"

btn.addEventListener('click', ()=> {

    fetch( 'http://'+{idc}+'/products/'+{idp}+'', {method: 'POST'})
   // enviar =  producto.addProductInCart(idc,idp)
    //onClick: enviar
   // return enviar
});
