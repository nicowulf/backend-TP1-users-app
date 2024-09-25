import { getUsers, getUserById, addUser, updateUser, deleteUser } from "./models.js";
import { createUserObject, createUpdateUserObject } from "./utils/createUserObject.js";
import { handleError  } from "./utils/handleError.js";
import { help } from "./utils/help.js"

const args = process.argv.splice(2);
const action = args[0];

switch (action) {
   case "list":
        console.log(getUsers(process.env.PATH_FILE_USER));
        break;
    case "search":
        console.log(getUserById(args[1]));
        break;
    case "add":
        const newUser = createUserObject(args);
        console.log(addUser(newUser));
        break;
    case "update":
        const updateUser = createUpdateUserObject(args);
        console.log(updateUser(updateUser));
        break;
    case "delete":
        console.log(deleteUser(args[1]));
        break;
    case "help":
        console.log(help());
        break;    
    default:
        const error = handleError(
            new Error("Invalid command, use 'help' for assistance"),
            process.env.PATH_FILE_ERROR
        );
        console.log(error);
        break;
}