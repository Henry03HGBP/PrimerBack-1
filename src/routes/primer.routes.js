import {Router} from "express";
import { hola,hola2,envioJson } from "../controllers/primer.controller.js";
const router = Router();

// req = request res = response
// req -> SERVIDOR (hace cosas) -> res
router.get('/api/hola/:nombre', hola)
router.get('/api/hola2', hola2)
router.post('/api/json',envioJson)


export default router;