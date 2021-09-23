import { Router, Request, Response, NextFunction } from "express";
import lgaController from "../controllers/lgas.controller";
import lgaCasesController from "../controllers/lgasCases.controller";

/**
 * Router to handlel `/api/lgas`
 */
const router = Router();

// List of LGAs
router.get("/",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['LGA']
        #swagger.description = 'Retrieve all LGAs excluding number of cases by dates'
        #swagger.responses[200] = {
                description: 'Success'
        }
        */
        next();
    },
    lgaController)

// List of LGAs (including `notifiedCasesByDates`) based LGA ids in query params
router.get("/cases",
    (req: Request, res: Response, next: NextFunction) => {
        /*
        #swagger.tags= ['LGA']
        #swagger.description = 'Retrieve list of cases by recent dates by specified LGAs'
        #swagger.parameters['lgaIds'] = {
            in: 'query',
            type: 'array',
            required: true,
            description: 'Id of the LGAs. id is the same value as code19',
        }
        #swagger.responses[200] = {description: 'Success'}
        #swagger.responses[400] = {description: 'Missing or invalid parameters'}

        */
        next();
    },
    lgaCasesController);

export default router;
