import passport from "passport";
import local from "passport-local";
import usuarioModel from "../DAO/models/Mongo/usuarios.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const LocalStrategy = local.Strategy;


// Middleware de autenticación basada en token

// Función para comparar la contraseña proporcionada por el usuario con la almacenada en la base de datos
/*export const isValidPassword = async (user, password) => {
  try {
    // Compara la contraseña proporcionada con la contraseña almacenada utilizando bcrypt
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log("Error al comparar contraseñas", error);
    return false;
  }
};
 */

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ status: "error", error: "Token no proporcionado" });
  }

  jwt.verify(token, "mi_secreto", (err, user) => {
    if (err) {
      return res.status(403).send({ status: "error", error: "Token inválido" });
    }
    req.user = user;
    next();
  });
};


const initializePassport = () => {
  passport.use(
    "registro",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, rol } = req.body;
        try {
          let user = await usuarioModel.findOne({ email: username });
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }
          let newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            rol,
          };
          let result = await usuarioModel.create(newUser);
          return done(null, result);
        } catch (err) {
          return done("Error al obtener el usuario" + err);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await usuarioModel.findOne({ email: username });
          console.log(user)
          if (!user) {
            console.log("El usuario no existe");
            done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = usuarioModel.findById(_id);
    done(null, user);
  });
};

export const authorization = (rol) => {
  return (req, res, next) => {
    console.log('midelware',req.session.user.rol)
    if (req.isAuthenticated() && req.session.user.rol === rol) {
      
      return next();
      
    } else {
      return res.send("Acceso denegado");
    }
  };
};

export default initializePassport;
