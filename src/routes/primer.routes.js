import {Router} from "express";
import { hola,hola2,envioJson,getSocios,getSociosTelefono,createSocio,updateSocio,deleteSocio,getBarcos,createBitacora} from "../controllers/primer.controller.js";
const router = Router();

// req = request res = response
// req -> SERVIDOR (hace cosas) -> res
router.get('/api/hola/:nombre', hola)
router.get('/api/hola2', hola2)
router.post('/api/json',envioJson)


router.get('/api/getSocios/telefono/:telefono', getSociosTelefono)


router.get('/api/getBarcos', getBarcos)
router.post('/api/createSocio', createSocio)
router.get('/api/getSocios', getSocios)
router.put('/api/updateSocio', updateSocio)
router.delete('/api/deleteSocio/:email', deleteSocio)

router.post('/api/createBitacora',createBitacora)


export default router;