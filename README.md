README - Preentrega: Proyecto Final - Backend III (Testing y Escalabilidad)

Proyecto: Generador de datos mocks para pruebas (usuarios y pets)
Curso: Programación Backend III: Testing y Escalabilidad Backend - Carreras Intensivas
Autor: (pon tu nombre aquí)
Tecnologías: Node.js, Express, MongoDB (Mongoose), bcryptjs, @faker-js/faker

1. Resumen del proyecto

Este repositorio contiene la implementación de un router /api/mocks con utilidades para generar datos mock (usuarios y mascotas). Permite:

Generar usuarios falsos con contraseña encriptada (coder123) y role aleatorio (user / admin) y pets: [].

Generar mascotas mock.

Insertar en la base de datos cantidades indicadas de usuarios y pets mediante POST /api/mocks/generateData.

Proveer endpoints para obtener los mocks sin persistirlos (útil para pruebas).

Este proyecto está pensado para pruebas, demos y pre-entregas. No debe dejarse expuesto en entornos de producción.

2. Estructura del repositorio (recomendada)
/
├─ src/
│  ├─ models/
│  │  ├─ user.model.js
│  │  └─ pet.model.js
│  ├─ routes/
│  │  └─ mocks.router.js
│  ├─ utils/
│  │  └─ mocking.js
│  └─ app.js
├─ .env
├─ .gitignore
├─ package.json
└─ README.md

3. Requisitos previos

Node.js v16+ instalado.

MongoDB local (por ejemplo mongodb://localhost:27017/mi_proyecto_db) o una instancia en Mongo Atlas.

Git (para subir a GitHub).

4. Variables de entorno (.env)

Crea un archivo .env en la raíz con al menos:

PORT=3000
MONGO_URI=mongodb://localhost:27017/mi_proyecto_db
NODE_ENV=development


Si usas Mongo Atlas reemplaza MONGO_URI por la URI correspondiente.

5. Instalación

Desde la raíz del proyecto:

npm install


(Si no tienes package.json, ejecutar npm init -y antes.)

Sugerencia de dependencias:

npm install express mongoose dotenv bcryptjs @faker-js/faker
npm install --save-dev nodemon


Ejemplo de scripts en package.json:

"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}

6. Endpoints importantes

Base del router: /api/mocks

GET /api/mocks/mockingusers

Descripción: Genera usuarios mock (por defecto 50).

Query opcional: ?amount=30 (cantidad deseada).

Respuesta: { status: 'success', payload: [ { _id, first_name, last_name, email, password, role, pets }, ... ] }

Nota: password viene hasheada y su valor en texto original es coder123.

GET /api/mocks/mockingpets

Descripción: Genera mascotas mock (por defecto 20).

Query opcional: ?amount=15

Respuesta: { status: 'success', payload: [ { _id, name, species, age }, ... ] }

POST /api/mocks/generateData

Descripción: Genera e inserta en la base de datos la cantidad de users y pets indicada.

Body JSON: { "users": 10, "pets": 5 }

Respuesta: { status: 'success', created: { users: 10, pets: 5 } }

Verificación: usar tus endpoints GET /api/users y GET /api/pets para comprobar inserciones.

7. Cómo ejecutar (local)

Asegúrate de que MongoDB esté en marcha (local o Atlas).

Configura .env.

Ejecuta el servidor en modo desarrollo:

npm run dev


Verifica en la consola Mongo conectado y Servidor escuchando en http://localhost:3000.

8. Ejemplos de uso (curl)

Generar 50 usuarios mock (sin insertar):

curl http://localhost:3000/api/mocks/mockingusers


Generar 30 usuarios mock:

curl "http://localhost:3000/api/mocks/mockingusers?amount=30"


Insertar 10 usuarios y 5 pets en la base de datos:

curl -X POST http://localhost:3000/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 5}'


Consultar tus usuarios insertados (si tu proyecto tiene GET /api/users):

curl http://localhost:3000/api/users

9. Notas técnicas y recomendaciones

Contraseña: la contraseña usada en los mocks es siempre coder123 — en la DB se guarda en forma hasheada con bcryptjs.

Formato Mongo: los objetos generados incluyen _id con ObjectId para que tengan el formato de una respuesta de Mongo.

Emails únicos: si tu esquema User marca email como unique, puede haber colisiones raras. Si obtienes errores al insertar, puedes:

Generar emails garantizados únicos añadiendo el índice del bucle al nombre.

Usar insertMany(users, { ordered: false }) para que continúe ante errores de duplicado.

Producción: estos endpoints son para desarrollo — añade protección (por ejemplo if (process.env.NODE_ENV === 'production') desactiva o protege el router).

Performance: generateUsers hashea la misma contraseña una sola vez para ahorrar tiempo. Si necesitas salts distintos por usuario, hashea dentro del loop (más lento).

Validaciones del modelo: adapta los objetos generados al esquema real de tu proyecto si tienes campos requeridos adicionales.

10. Criterios de evaluación (mapeo rápido)

Router mocks.router.js

Creado y montado en /api/mocks.

GET /mockingpets migrado correctamente.

Módulo Mocking (generateUsers)

Genera la cantidad indicada.

Password encriptada.

role alterna entre user y admin.

pets como array vacío.

Formato similar a petición Mongo (_id, timestamps opcional).

Endpoint GET /mockingusers

Utiliza el módulo mock y devuelve usuarios correctamente.

Endpoint POST /generateData

Inserta en DB la cantidad solicitada de users y pets.

Verificable con GET /api/users y GET /api/pets.

11. Problemas comunes y soluciones rápidas

Error de conexión a Mongo: revisa MONGO_URI y que Mongo esté corriendo.

InsertMany falla por unique index: usar ordered:false o ajustar generación de emails.

Dependencias faltantes: npm install en la raíz del proyecto.

Endpoint no responde: revisar que app.use('/api/mocks', mocksRouter) esté correctamente importado y que el servidor haya arrancado sin errores.

12. Buenas prácticas antes de entregar

Añade node_modules/ y .env a .gitignore.

Incluye instrucciones claras en el README (este).

Muestra comandos para probar (curl/Postman).

Explica en el README cómo desactivar estos endpoints en producción.

Comprime o instala todo localmente y prueba los endpoints antes de subir.

13. Ejemplo de README mínimo para entrega (lista de verificación)

 Código del router src/routes/mocks.router.js

 Módulo src/utils/mocking.js

 Modelos src/models/user.model.js, src/models/pet.model.js (o reusar los tuyos)

 src/app.js con conexión a Mongo y mounting del router

 .env.example con variables

 README.md (este archivo)

 Repo subido a GitHub sin node_modules# backiiipreeni
