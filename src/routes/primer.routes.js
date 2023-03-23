import {Router} from "express";
import { hola,hola2,envioJson,getSocios,getSociosTelefono,createSocio } from "../controllers/primer.controller.js";
const router = Router();

// req = request res = response
// req -> SERVIDOR (hace cosas) -> res
router.get('/api/hola/:nombre', hola)
router.get('/api/hola2', hola2)
router.get('/api/getSocios', getSocios)
router.get('/api/getSocios/telefono/:telefono', getSociosTelefono)
router.post('/api/json',envioJson)
router.post('/api/createSocio', createSocio)


export default router;