import express from "express";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";

import routerProduct from "../src/routes/product.router.js"
import routerUsers from "../src/routes/users.router.js"
import routerViewHome from "../src/routes/home.view.router.js"


import paths from "./utils/paths.js";

// se crea una instancia de la aplicacion express
const app = express();

// se define el puerto en el que el servidor escuchara las solicitudes
const PORT = 8080;

// middleware para acceder al contenido del formulario codificados en url
app.use(express.urlencoded({extended: true}));

// Configuración del motor de plantillas
configHandlebars(app);

// Middleawre para acceder al contenido JSON de las solicitudes
app.use(express.json());

app.use("/api/public", express.static(paths.public));

app.use("/api/product", routerProduct);
app.use("/api/users", routerUsers);
app.use("/", routerViewHome);


// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);