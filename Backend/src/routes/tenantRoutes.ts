import { Router } from "express";
import {tenantRegistration} from "../controllers/Domain/registeration.js"


const router = Router();

router.post("/register", tenantRegistration)



export default router 