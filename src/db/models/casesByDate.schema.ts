import { Schema } from "mongoose";
import { ICasesByDate } from "../../types/common";
/**
 * Schema to hold number of cases by specific date.
 */
const schema = new Schema<ICasesByDate>({
    cases: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});
export default schema;
