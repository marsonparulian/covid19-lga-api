import { fetchRecords, filterRecords, convertRecords, insertManyLgas } from "./update-lga-cases.helper";
import Lga from "../db/models/lga.model";

/**
 * Update cases in each lga, based on the fetched data
 */
export default async (): Promise<void> => {
    try {
        // Drop collection
        await Lga.collection.drop()
            .catch((e) => {
                throw (e);
            });

        // Fetch data from data source. Will throw error if response is error or invalid data format.
        const records = await fetchRecords(7)
            .catch((e) => {
                throw (e);
            });

        // Filter the records. Remove empty date or empty LGA
        const filteredRecords = filterRecords(records);

        // TODO Process data to match DB schema .
        const lgas = convertRecords(filteredRecords);

        // DB insert many.
        await insertManyLgas(lgas)
            .catch((e) => {
                throw (e);
            });
    } catch (e) {
        throw (e);
    }
}
