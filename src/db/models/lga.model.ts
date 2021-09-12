import { Schema, Model, model } from "mongoose";
import { ILga } from "../../types/common";
import casesByDateSchema from "./casesByDate.schema";

/**
 * Schema to persis LGA
 */
const lgaSchema = new Schema<ILga>({
    _id: { type: String, required: true },
    code19: { type: String, required: true },
    name19: { type: String, required: true },
    notifiedCasesByDates: [casesByDateSchema],
});

const Lga = model<ILga, Model<ILga>>("Lga", lgaSchema);
export default Lga;
