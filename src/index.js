import express from "express";
import rutasProductos from "./routes/productos.routes.js"

const app = express();
app.use(express.json());
app.use('/api',rutasProductos);

app.listen(3000);
console.log("Servidor ejecutandose en el puerto 3000");