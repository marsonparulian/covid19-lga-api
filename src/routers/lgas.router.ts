import { Router } from "express";
import lgaController from "../controllers/lgas.controller";
import lgaCasesController from "../controllers/lgasCases.controller";

/**
 * Router to handlel `/api/lgas`
 */
const router = Router();

// List of LGAs
router.get("/", lgaController)

// List of LGAs (including `notifiedCasesByDates`) based LGA ids in query params
router.get("/cases", lgaCasesController);

export default router;
