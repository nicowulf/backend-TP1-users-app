# **APLICACIÓN GESTIÓN DE USUARIOS**

Esta es una aplicación, desarrollada con Node.js, que permite administrar usuarios a partir de comandos para crear, leer, actualizar y eliminar (CRUD) a través de la terminal. Ademas, permite el manejo de errores, capturando y registrando los mismos en un archivo, facilitando así la utilización y seguimiento del sistema.

## Comandos

Los commandos válidos para el correcto uso de la aplicación son:

### `list`

Proporciona una lista de los usuarios registrados en el sistema.

- **Uso**:

```bash
node index.js list
```

### `search`

Permite buscar un usuario indicando su ID.

- **Uso**:

```bash
node index.js search <id>
```

### `add`

Utilizado para crear un nuevo usuario.

- **Uso**:

```bash
node index.js add <nombre> <apellido> <email> <password>
```

Deben proporcionarse los datos nombre, apellido, email y password.

### `update`

Permite actualizar o modificar la información de un usuario existente a partir de su búsqueda por "id".

- **Uso**:

```bash
node index.js update <id> <nombre> <apellido> <email> <password>
```

### `delete`

Elimina un usuario registrado por su ID.

- **Uso**:

```bash
node index.js delete <id>
```

### `help`

Muestra una lista de los comandos disponibles.

- **Uso**:

```bash
node index.js help
```

## Almacenamiento

Los datos de los usuarios se guardan en el archivo `data/users.json` con la siguiente estructura:

- **ID del usuario** (con formato UUID)
- **Nombre** (string)
- **Apellido** (string)
- **Email** (string, único)
- **Password** (string, hasheada)

## Manejo de Errores

El sistema captura y registra los errores ocurridos y los almacena en `error/log.json` con la siguiente estructura:

- **ID del error**
- **Tipo de error**
- **Fecha y hora**
