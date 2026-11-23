# API de Productos

API REST que gestiona un catálogo de productos. Permite listar, buscar por categoría, crear y eliminar productos. Las rutas están protegidas con autenticación JWT: el usuario obtiene un token al loguearse y lo envía en cada request para acceder a los endpoints.

- **Autenticación:** JWT (usuarios hardcodeados, sin registro por el momento)
- **Base de datos:** Firebase Firestore (products y categories)


## Iniciar

nodemon start

## Login - Usuario registrado para pruebas:
Ingresar las credenciales para crear un token válido:
POST http://localhost:3007/api/login

 1) { id: 1, email: 'admin@gmail.com', password: '123456' }
 2) { id: 2, email: 'admin@test.com', password: 'admin123' }

Devuelve { "token": "eyJ..." }. Expira a los 60 min.
El token obtenido utilizarlo en pestaña Authorization (Bearer Token) para realizar una consulta a alguna de las siguientes rutas:

## Endpoints:
Todas requieren header Authorization: Bearer <token>.

🟡 GET http://localhost:3007/auth/api/products — lista productos 
🟡 GET http://localhost:3007/auth/api/products/?categoria=calzado - obtiene productos de un sola categoria
🟡 GET http://localhost:3007/auth/api/products/:id — producto por ID
🟡 DELETE http://localhost:3007/auth/api/products/:id - eliminar un producto
🟡 POST http://localhost:3007/auth/api/products/create — crear producto


  BODY PARA CREAR NUEVOS PRODUCTOS:

  🔵 Ej 1:
  {
      "nombre": "pantalon san lorenzo",
      "precio": 50000,
      "marca": "adidas",
      "categoria": "indumentaria",
      "stock": 10
  }
  🔵 Ej 2:
  {
      "stock": 45,
      "categoria": "pelotas",
      "precio": 75900,
      "nombre": "pelota futbol",
      "marca": "puma"
        }

Campos obligatorios: nombre, precio, marca, categoria, stock.




