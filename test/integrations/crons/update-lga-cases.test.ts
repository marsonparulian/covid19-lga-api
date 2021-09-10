import updateLgaCases, { fetchRecords, filterRecords } from "../../../src/crons/update-lga-cases";
import { record1, record2, record3 } from "../../testlibs/dataSource.testlib";

// Increase timeout since one of test will require to fetch from data source.
jest.setTimeout(12000);

// Test updating LGA cases
describe("Update LGA cases", () => {
    test.todo("Data source response with failed (unsuccessful) result");
    test.todo("Data source response with available data /records");
    /*
        test("fetchRecords ", async () => {
            const records = await fetchRecords().catch((e) => {
                throw (e);
            });
    
            // Verify records has element more than 1
            expect(records.length).toBeGreaterThan(0);
            // Verify the sape of the first element match the `IRecord` interface
            const shapeIRecord = expect.objectContaining({
                cases: expect.any(Number),
                notification_date: expect.any(String),
                lga_code19: expect.any(String),
                lga_name19: expect.any(String),
            });
            expect(records[0]).toEqual(shapeIRecord);
            // Verify the shape of all elements
            expect(records).toEqual(expect.arrayContaining([{
                cases: expect.any(Number),
                notification_date: expect.any(String),
                lga_code19: expect.any(String),
                lga_name19: expect.any(String),
            }]));
        });
        */
    test("Should filtere records with empty date and lga code", () => {
        // Prepare data
        const records = [
            record1,
            { notification_date: "", cases: 0, lga_code19: "X341", lga_name19: "" },
            record2,
            { notification_date: "2021-09-25", cases: 0, lga_code19: "", lga_name19: "" },
            record3
        ];

        // Filter
        const filteredRecords = filterRecords(records);

        // Verify the number of elements
        expect(filteredRecords.length).toBe(3);
        // Verify the expected result
        expect(filteredRecords).toEqual([
            record1, record2, record3
        ]);
    });
    describe("Convert data source records to ILga app format", () => {
        test.todo("Test data 'record1', 'record2', and 'record3' should not have the same LGA");
        test.todo("With basic test data");
        test.todo("With 2 LGAs have multiple records");
    });
});
