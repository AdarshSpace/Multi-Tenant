import { Router } from "express";
import {tenantRegistration} from "../controllers/Domain/registration.js"
import { verifyTenantDomain } from "../controllers/Domain/verifyTenantDomain.js"
import { getTenants } from "../controllers/Domain/getAllTenants.js"

const router = Router();

router.post("/register", tenantRegistration)
router.get("/getAllTenants", getTenants);
router.post("/:tenantId/verify-domain", verifyTenantDomain)

export default router 