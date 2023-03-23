import modelosInit from '../models/init-models.js'
import { sequelize } from '../database/database.js'

let models = modelosInit(sequelize)

export const hola  = (req,res) => {
    let {nombre} = req.params
    res.status(200).json("Hola "+nombre)
}

export const hola2 = async (req,res) => {
    let response = await models.barcos.findAll()
    res.status(200).json(response)
}

export const envioJson = (req,res) => {
    let cuerpo = req.body
    console.log(req.headers.authorization)
    cuerpo.password = ""
    cuerpo.registro = "Registro 2"
    let respuesta = {
        "Animal":"perro",
        "Animal2":"gato"
    }
    cuerpo.mascotas = respuesta
    res.status(200).json(cuerpo)
}