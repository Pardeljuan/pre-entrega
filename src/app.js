import express from "express";
import paths from "./utils/paths.js";

import routerProduc from "../src/routes/produc.router.js"
import routerUsers from "../src/routes/users.router.js"

// se crea una instancia de la aplicacion express
const app = express();

// se define el puerto en el que el servidor escuchara las solicitudes
const PORT = 8080;

// middleware para acceder al contenido del formulario codificados en url
app.use(express.urlencoded({extended: true}));

// Middleawre para acceder al contenido JSON de las solicitudes
app.use(express.json());

app.use("/api/public", express.static(paths.public));

app.use("/api/produc", routerProduc);
app.use("/api/users", routerUsers);


// se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});