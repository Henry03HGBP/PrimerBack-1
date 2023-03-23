//Modelo <- Vista Controlador Servicios <--- Framework MVC
// HTTP HyperTextTypedProtocol Metodos de envio: GET,POST,PUT,DELETE
// Estatus: 200 -> OK, 404 -> NOT FOUND, 500 -> INTERNAL SERVER ERROR
//Headers o Cabeceras , Body o cuerpo (json), Metodo HTTP
import express from 'express';

//se incluye la conexion a la base
//ORM Object Relational Mapping
import { sequelize } from './database/database.js';

//se incluyen las rutas
import rutas from './routes/primer.routes.js'

async function main(){
    try{
        await sequelize.sync({force:false})
        await sequelize.authenticate()
        console.log("Conexion exitosa")
    }catch (error) {
        console.log(error)
        return;
    }

    const app = express();

    //Vas a permitir que lleguen archivos JSON
    app.use(express.json());

    //Vas a permitir la llega de datos desde la url de manera seguro
    app.use(express.urlencoded({extended:false}));

    //vas a usar estas rutas
    app.use(rutas)

    //Inicializate
    app.listen(3000)

    console.log("El servidor escucha en puerto 3000") 
}

main();
