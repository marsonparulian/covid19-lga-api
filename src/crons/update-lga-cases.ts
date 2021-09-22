import { fetchRecords, filterRecords, convertRecords, insertManyLgas } from "./update-lga-cases.helper";
import db from "../services/db.service";
import Lga from "../db/models/lga.model";

/**
 * Update cases in each lga, based on the fetched data
 */
export default async (): Promise<void> => {
    // Connect to DB
    await db.connect();

    // Drop collection
    await Lga.collection.drop();

    // Fetch data from data source. Will throw error if response is error or invalid data format.
    const records = await fetchRecords(7);

    // Filter the records. Remove empty date or empty LGA
    const filteredRecords = filterRecords(records);

    // TODO Process data to match DB schema .
    const lgas = convertRecords(filteredRecords);

    // DB insert many.
    await insertManyLgas(lgas);

    // Close DB connection
    await db.disconnect();
}
