import fetch from "cross-fetch";
import { IRecord } from "../types/dataSource";

/**
 * Update cases in each lga, based on the fetched data
 */
export default async () => {
    try {
        // Fetch data from data source. Will throw error if response is error or invalid data format.


        // TODO Process data to match DB schema .

        // DB upsert many.
    } catch (e) {
        throw (e);
    }
}
export const fetchRecords = async (): Promise<IRecord[]> => {
    // Prepare variables
    const resourceId = "21304414-1ff1-4243-a5d2-f52778048b29"; // Resource for covid locations data.
    const select = "notification_date, count(*) as cases, lga_code19, lga_name19 "; // Fields to be selected
    const groupBy = "notification_date, lga_code19, lga_name19"; // Grouping fields
    const orderBy = "notification_date";
    const startDate = '2021-09-05'; // Start date of records  to be fetched.

    //  Prepare sql statements
    const sql = `select ${select} from "${resourceId}" where notification_date >  '${startDate}' group by ${groupBy} order by ${orderBy}`;
    const url = `https://data.nsw.gov.au/data/api/3/action/datastore_search_sql?sql=${sql}`;

    // Fetch
    return fetch(url)
        .then((response) => {
            // Throw error if response not `ok`
            if (!response.ok) {
                throw new Error(JSON.stringify(response));
            }
            return response.json();
        }).then((data) => {
            if (!data.success) {
                throw new Error("response.body.success is falsy");
            }
            return data.result.records;
        });
}
