import { Schema, Model, model } from "mongoose";
import { ILga } from "../../types/common";
import casesByDateSchema from "./casesByDate.schema";

/**
 * Schema to persis LGA
 */
const lgaSchema = new Schema<ILga>({
    _id: { type: String, required: true }, // `code19` is used as id
    code19: { type: String, required: true },  // Will be removed in future
    name19: { type: String, required: true },
    notifiedCasesByDates: [casesByDateSchema],
});

const Lga = model<ILga, Model<ILga>>("Lga", lgaSchema);
export default Lga;
