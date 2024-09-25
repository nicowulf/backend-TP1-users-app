const createUserObject = (args) => {
  return {
    nombre: args[1],
    apellido: args[2],
    email: args[3],
    password: args[4],
    isLoggedIn: false,
  };
};

const createUpdateUserObject = (args) => {
  return {
    nombre: args[2],
    apellido: args[3],
    email: args[4],
    password: args[5],
  };
};

export { createUserObject, createUpdateUserObject };