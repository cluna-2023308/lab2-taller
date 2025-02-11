# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointments/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```

### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/users/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/users/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/users/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/api/users/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/users/:uid/password`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pets/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pets/:pid`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/api/pets/:pid
  - **Método:** `DELETE`

- **Actualizar Información de la Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

## Funcionalidades Adicionales

Las siguientes funcionalidades necesitan ser desarrolladas:

1. **Actualizar Foto del Usuario**
   - Descripción: Implementar funcionalidad para actualizar la foto de perfil del usuario.

  Funcion: 
  - USER
    Metodo: PATCH
    URL: http://127.0.0.1:3001/adoptionSystem/v1/user/updateProfilePicture/:uid
    body: Form-data
    ```json
    {
			"key": "profilePicture",
			"type": "file",
			"src": "postman-cloud:///1ef4dc1f-9b79-4680-a529-ea114dc8ffeb"
		}

2. **Listar Citas**
   - Descripción: Implementar funcionalidad para listar todas las citas de un usuario.

   Funcion:
   - APPOINTMENT
     Metodo: GET
     URL: http://127.0.0.1:3001/adoptionSystem/v1/appointment/listAppointmentUser/:uid

     le solicita el ID del usuario para que la funcion pueda obtener las citas creadas con ese ID que proporciono
     en la ruta  

3. **Actualizar Cita**
   - Descripción: Implementar funcionalidad para actualizar una cita existente.

   Funcion:
   - APPOINTMENT
     Metodo: PUT
     URL: http://127.0.0.1:3001/adoptionSystem/v1/appointment/updateAppointment/:appointmentId

     le solicita el ID de la cita a la que desea que se le realicen actualizaciones en sus campos

4. **Cancelar Cita**
   - Descripción: Implementar funcionalidad para cancelar una cita existente.

   Funcion: 
   - APPOINTMENT
     Metodo: DELETE
     URL: http://127.0.0.1:3001/adoptionSystem/v1/appointment/cancelAppointment/:appointmentId

     le solicita el ID de la cita a la que desea que le cambie el status a CANCELLED
