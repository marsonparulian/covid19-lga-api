import { NextFunction, Request, Response } from "express";
import Lga from "../db/models/lga.model";
import texts from "../texts";
import { ILga } from "../types/common";

/**
 * Respond  with   `notifiedCasesByDates` for LGAs provided in `query` params.
 */
const controller = async (req: Request, res: Response) => {
    // Prepare params
    // If `lgaIds` is not an array, convert to array.
    const lgaIds: any[] = Array.isArray(req.query.lgaIds) ? req.query.lgaIds : [req.query.lgaIds];

    // Setup  filter
    const filter = {
        _id: {
            $in: lgaIds,
        }
    };

    // Fetch
    const lgas: void | ILga[] = await Lga.find(filter).lean().catch((e) => {
        // Respond error
        res.status(500).json({
            message: texts.ERROR,
            e,
        });
    });

    // Success 
    res.status(200).json({
        message: texts.SUCCESS,
        lgas: lgas,
    })
}
/**
 * Validate parameters
 */
const validateParams = (req: Request, res: Response, next: NextFunction): void => {
    // Is `lgaIds` is non empty array ?
    const lgaIds = req.query.lgaIds;
    const isParamsValid = !!lgaIds;

    if (!isParamsValid) {
        res.status(400).json({
            message: texts.BAD_REQUEST,
        });
    } else {
        next();
    }
}
export default [
    validateParams,
    controller,
];
