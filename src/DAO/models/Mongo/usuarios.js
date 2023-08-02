import mongoose from "mongoose";


const collection = "usuarios"
const documentoSchema = new mongoose.Schema({
    name: String,
    reference: String,
  });
const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: { type: String, default: 'user' } ,
    resetPasswordToken: String, // Token para restablecer contraseña
    resetPasswordExpires: Date, // Fecha de expiración del token de restablecimiento
    documents: [documentoSchema], // Propiedad "documents" como un array de objetos con las propiedades "name" y "reference"
    last_connection: Date, 
})

const usuarioModel = mongoose.model(collection, usuarioSchema)
export default usuarioModel