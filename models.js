import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import {
  createUserObject,
  createUpdateUserObject,
} from "./utils/createUserObject.js";
import { handleError } from "./utils/handleError.js";
import dotenv from "dotenv";

// Variables de entorno
dotenv.config();
const PATH_USERS_FILE = process.env.PATH_USERS_FILE;
const PATH_USERS_ERROR = process.env.PATH_USERS_ERROR;


// Métodos
// Traer la lista de Usuarios

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Access denied");
    }

    const existsFile = existsSync(urlFile);

    if (!existsFile) {
      writeFileSync(PATH_USERS_FILE, JSON.stringify([]));
      return []
    }

    const users = JSON.parse(readFileSync(PATH_USERS_FILE));
    return users;

    }
    
  catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

const resp = getUsers(PATH_FILE_USER);
console.log(resp);

// Buscar un Usuario por su ID

 const getUserById = (id) => {
   try {
    
     if (!id) {
       throw new Error("An ID is required");
     }

     const users = getUsers(PATH_USERS_FILE);
     const user = users.find((user) => user.id === id);

     if (!user) {
       throw new Error("User doesn't exist, try a valid ID");
     }
   } catch (error) {
     const objError = handleError(error, PATH_USERS_ERROR);
     return objError;
   }
 };

// Agregar nuevo Usuario

const addUser = (userData) => {
  try {
    const userData = { nombre, apellido, email, password };

    if ( !nombre || !apellido || !email || !password ) {
      throw new Error ("Missing data")
    }

    if (typeof(nombre || apellido || email !== string)) {
      throw new Error ("Invalid type of data, must be a string") 
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error ("Please use a valid email")
    }

    const users = getUsers();
    if (users.find((user) => user.email === email)) {
      throw new Error("Email already registered");
    }

    const hashPassword = createHash("sha256").update(password).digest("hex")

    const newUser = {
      id: randomUUID,
      nombre,
      apellido,
      email,
      password: hashPassword,
      loggedIn: false
    }

    users.push(newUser);
    writeFileSync(PATH_USERS_FILE, JSON.stringify(users));
    return newUser;

  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

// Actualizar un Usuario buscando por ID

const updateUser = (userData) => {
  try {
  } catch (error) {}
};

// Borrar un Usuario buscando por su ID

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
