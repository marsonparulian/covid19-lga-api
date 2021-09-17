import { Request, Response } from "express";
import Lga from "../db/models/lga.model";
import { ILga } from "../types/common";
import texts from "../texts";

/**
 * Respond with list of LGAs
 */
const controller = async (req: Request, res: Response) => {
    // Fetch LGAs
    const lgas: void | ILga[] = await Lga.find({}, "name19")
        .lean().catch((e) => {
            console.error(e);
        });

    // Response
    res.status(200).json({
        message: texts.SUCCESS,
        lgas
    });
}
export default controller;
