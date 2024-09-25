import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createUserObject, createUpdateUserObject } from "./utils/createUserObject.js";
import { validateEmail } from "./utils/validateEmail.js";
import { hashPassword } from "./utils/hashPassword.js";
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
    const { nombre, apellido, email, password } = userData;

    if ( !nombre || !apellido || !email || !password ) {
      throw new Error ("Missing data")
    }

    if (typeof(nombre || apellido || email !== string)) {
      throw new Error ("Invalid type of data, must be a string") 
    }

    validateEmail(email, users);

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

const updateUser = (id, userData) => {
  try { 

    const { id, nombre, apellido, email, password } = userData;
    
    if (!id || !userData) {
      throw new Error("ID or data missing");
    }

    const users = getUsers();
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error ("User not found")
    }

    const updateData = createUpdateUserObject(userData);

    if (updateData.nombre) user.nombre = updateData.nombre;
    if (updateData.apellido) user.apellido = updateData.apellido;

    if (updateData.email) {
      validateEmail(updateData.email, users);
      user.email = updateData.email;
    }

    if (userData.password) {
      user.password = hashPassword(userData.password);
    }
    
    writeFileSync(PATH_USERS_FILE, JSON.stringify(users));
    return user;

  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;}
};

// Borrar un Usuario buscando por su ID

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_FILE_USER);
    const userToDelete = getUserById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const filterUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE_USER, JSON.stringify(filterUsers));
    return userToDelete;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
