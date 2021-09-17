import { Router } from "express";
import lgaController from "../controllers/lgas.controller";

/**
 * Router to handlel `/api/lgas`
 */
const router = Router();

// List of LGAs
router.get("/", lgaController)

export default router;
