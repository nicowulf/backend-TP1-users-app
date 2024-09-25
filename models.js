import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import { createUserObject, createUpdateUserObject,} from "./utils/createObjectUser.js";
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

// Buscar un Usuario por su ID

const getUserById = (id) => {
  try {
  } catch (error) {}
};

// Agregar nuevo Usuario

const addUser = (userData) => {
  try {
  } catch (error) {}
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
