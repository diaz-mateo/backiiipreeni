# 🐶 Proyecto Mocking API – MongoDB + Express

Este proyecto es una API construida con **Node.js + Express + Mongoose**, que permite **generar datos ficticios (mocking)** de usuarios y mascotas, así como **insertarlos en MongoDB Atlas** para pruebas y desarrollo.

---

## 🚀 Tecnologías usadas

- **Node.js + Express** – Servidor web  
- **MongoDB Atlas + Mongoose** – Base de datos  
- **Faker.js** – Generación de datos falsos realistas  
- **Dotenv** – Variables de entorno  

---

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <URL-del-repo>
cd <carpeta-del-proyecto>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

En la raíz del proyecto (misma carpeta donde está `src`), crea un archivo llamado `.env` con el siguiente contenido:

```ini
PORT=3000
MONGO_URI=<tu-string-de-conexion-de-MongoDB-Atlas>
```

**Ejemplo:**

```bash
MONGO_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/midb
```

---

## ▶️ Ejecutar el servidor

```bash
npm start
```

O si estás en desarrollo:

```bash
npm run dev
```

Verás en consola:

```
Conectado a MongoDB Atlas
Servidor escuchando en http://localhost:3000
```

---

## 🧪 Endpoints disponibles

### ✅ Verificar conexión
**GET →** `/api/test`  
Prueba si la conexión con MongoDB está activa.

**Respuesta ejemplo:**
```json
{ "ok": true, "mensaje": "Conexión a MongoDB exitosa 🚀" }
```

---

### 🧍‍♂️ Usuarios

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| GET | `/api/users` | Lista todos los usuarios guardados en la base de datos |
| GET | `/api/users/:id` | Obtiene un usuario por su ID |

---

### 🐾 Mascotas

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| GET | `/api/pets` | Lista todas las mascotas guardadas |
| GET | `/api/pets/:id` | Obtiene una mascota por ID |

---

### 🧩 Mocking (datos falsos)

#### 1️⃣ Generar usuarios falsos (sin guardar)
**GET →** `/api/mocks/mockingusers`  
Opcional: `?amount=100` para definir cantidad.

#### 2️⃣ Generar mascotas falsas (sin guardar)
**GET →** `/api/mocks/mockingpets`  
Opcional: `?amount=20`

#### 3️⃣ Generar e insertar datos en MongoDB
**POST →** `/api/mocks/generateData`

**Body (JSON):**
```json
{
  "users": 10,
  "pets": 5
}
```

**Respuesta ejemplo:**
```json
{
  "status": "success",
  "created": {
    "users": 10,
    "pets": 5
  }
}
```

---

## 📬 Pruebas recomendadas en Postman

**Verificar conexión:**
```
GET http://localhost:3000/api/test
```

**Generar e insertar datos:**
```
POST http://localhost:3000/api/mocks/generateData
```

**Body → JSON:**
```json
{
  "users": 5,
  "pets": 5
}
```

**Listar usuarios guardados:**
```
GET http://localhost:3000/api/users
```

**Listar mascotas guardadas:**
```
GET http://localhost:3000/api/pets
```

**Generar mocks sin guardar (solo vista):**
```
GET http://localhost:3000/api/mocks/mockingusers
GET http://localhost:3000/api/mocks/mockingpets
```

---

## 🧠 Notas

- Los datos generados con `/mockingusers` y `/mockingpets` **no se guardan en la base de datos**.  
- Para insertar en MongoDB, usa el endpoint `/api/mocks/generateData`.  
- Puedes cambiar la cantidad de datos usando `?amount=` o pasando valores en el body.  

---

## 📘 Autor

**Mateo Diaz**  
Proyecto educativo para práctica con **Express + MongoDB + Faker.js**