import modelosInit from '../models/init-models.js'
import { sequelize } from '../database/database.js'

let models = modelosInit(sequelize)

export const hola  = (req,res) => {
    let {nombre} = req.params
    res.status(200).json("Hola "+nombre)
}

export const hola2 = async (req,res) => {
    let response = await models.bitacoras.findAll() //Encuentra todos
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

//backend de club nautico

export const getSocios = async (req,res) => {
    let response;
    try {
        response = await models.socios.findAll({
            attributes : {exclude :['edad']},
            include: {
                model: models.barcos,
                attributes : {exclude :['id_barco','socio_id']},
                as: "barcos",
                include:{
                    model: models.bitacoras,
                    as: "bitacoras",
                    attributes : {exclude :['id_bitacora','barco_id','patron_id']},
                    include:{
                        model: models.patrones,
                        as: "patron",
                        attributes : {exclude :['id_patron']},
                    }
                }
            }
        }) //Encuentra todos
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(200).json(response)
}

export const getSociosTelefono = async (req,res) => {
    
    let {telefono} = req.params
    let response;
    
    if(isNaN(telefono)){
        res.status(404).json({
            "Estatus": telefono + " no es un numero, ingresa un numero de telefono"
        })
        return; 
    }
    
    try {
        response = await models.socios.findAll({
            where: {telefono}
        }) //Encuentra al socio por su telefono

        if(response.length == 0){
            res.status(404).json({
                "Estatus": "No se encontro el registro en la base"
            })
            return;
        }
        
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(200).json(response)
}

export const createSocio = async (req,res) => {
    
    let {nombre,apellido,telefono,edad,email} = req.body
    let response;
    let aux;
    try {

        aux = await models.socios.findAll({
            where: {email}
        })

        if(aux.length > 0){
            res.status(406).json({
                "Estatus": "Este email ya se encuentra registrado"
            })
            return;
        }

        response = await models.socios.create({
            nombre,
            apellido,
            telefono,
            edad,
            email
        })

    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(201).json(response)
}

export const updateSocio = async (req,res) => {
    
    let {nombre,apellido,telefono,edad,email} = req.body
    let socio;
    try {

        socio = await models.socios.findOne({
            where: {email}
        })        

        socio.nombre = nombre
        socio.apellido = apellido
        socio.telefono = telefono
        socio.edad = edad

        await socio.save()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(202).json(socio)
}

export const deleteSocio = async (req,res) => {
    
    let {email} = req.params
    let socio;
    try {

        socio = await models.socios.destroy({
            where: {email}
        })        

        
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(202).json(socio)
}

export const getBarcos = async (req,res) => {
    let response;
    try {
        response = await models.barcos.findAll({}) //Encuentra todos
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(200).json(response)
}

export const createBitacora = async (req,res) => {
    let {tiempo_salida,fecha_salida,barco_id,patron_id} = req.body
    console.log(tiempo_salida)
    let response;
    let aux;
    try {

        aux = await models.bitacoras.findAll({
            where: {barco_id,fecha_salida},
        })

        if(aux.length >= 2){
            res.status(401).json({
                "Estatus": "El barco no puede salir mas de dos veces"
            })
            return;
        }

    
        response = await models.bitacoras.create({
            tiempo_salida,
            fecha_salida,
            barco_id,
            patron_id
        })

    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }
    
    res.status(201).json(response)
}