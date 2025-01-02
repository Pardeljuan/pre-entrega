Entrega Final Backend CoderHouse
Descripción
Esta API está diseñada para un e-commerce, permitiendo gestionar productos y carritos de compra con operaciones CRUD básicas. Incluye validaciones fundamentales, un sistema de plantillas para renderizar páginas iniciales, y una funcionalidad en tiempo real que actualiza la lista de productos mediante WebSocket.

Características
Gestión de Productos
Crear, leer, actualizar y eliminar productos.
Mostrar la lista de productos.
Gestión de Carritos
Crear y eliminar carritos.
Visualizar el contenido de un carrito.
Agregar y eliminar productos dentro de los carritos.
Validaciones y Manejo de Errores
Validaciones para asegurar el ingreso correcto de datos y parámetros en las peticiones.
Mensajes claros en caso de errores o solicitudes inválidas.
Renderizado Dinámico
Página principal con la lista de productos.
Vista para carritos y detalles de productos.
Actualización en tiempo real de la lista de productos mediante WebSocket en /realTimeProducts.
Tecnologías Utilizadas
JavaScript
Node.js
Express.js
dotenv
paginate-v2
Handlebars
Socket.IO
Cómo Usar
Interacción con Productos y Carritos:

Agregar productos al carrito.
Eliminar productos individuales o vaciar el carrito completo.
Endpoints API:

Puedes usar herramientas como Postman para interactuar con los endpoints y realizar operaciones CRUD sobre productos y carritos.
Página en Tiempo Real:

Visita /realTimeProducts para añadir o eliminar productos desde un formulario y visualizar los cambios en tiempo real.