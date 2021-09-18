import { NextFunction, Request, Response } from "express";
import Lga from "../db/models/lga.model";
import texts from "../texts";
import { ILga } from "../types/common";

/**
 * Respond  with   `notifiedCasesByDates` for LGAs provided in `query` params.
 */
const controller = async (req: Request, res: Response) => {
    // FIXME : Fetch LGAs based on LGA ids in query params
    const lgas: void | ILga[] = [];

    // Respond
    res.status(501).json({
        message: texts.SUCCESS,
    });
}
/**
 * Validate parameters
 */
const validateParams = (req: Request, res: Response, next: NextFunction): void => {
    // Is `lgaIds` is non empty array ?
    const lgaIds = req.query.lgaIds;
    const isParamsValid = !!lgaIds;
    console.log("lgaIds : ", lgaIds);

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
];
