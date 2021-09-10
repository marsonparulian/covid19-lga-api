import fetch from "cross-fetch";
import { ILga } from "../types/common";
import { IRecord } from "../types/dataSource";

/**
 * Update cases in each lga, based on the fetched data
 */
export default async () => {
    try {
        // Fetch data from data source. Will throw error if response is error or invalid data format.

        // Filter the records. Remove empty date or empty LGA

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
    const orderBy = "notification_date DESC";
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


/**
 * Filter records. Remove record with falsy `notification_date` or falsy `lga_code19`
 * @param records<IRecord[]> - Source records.
 * @return <IRecord[]> - Filtered records
 */
export const filterRecords = (records: IRecord[]): IRecord[] => {
    return records.filter((rec) => {
        if (rec.notification_date && rec.lga_code19 && rec.lga_name19) {
            return true;
        }
        return false;
    });
}

/**
 * Convert `records` to match array of `ILga`
 * @param records {IRecord[]} - Source records
 * @return {ILga[]} - Resulted array of `ILga`
 */
export const convertRecords = (records: IRecord[]): ILga[] => {
    // Prepare variables
    let result: ILga[] = [];

    // Iterate through records

    return result;
}
