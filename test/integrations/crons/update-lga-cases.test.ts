import updateLgaCases, { fetchRecords } from "../../../src/crons/update-lga-cases";

// Increase timeout since one of test will require to fetch from data source.
jest.setTimeout(12000);

// Test updating LGA cases
describe("Update LGA cases", () => {
    test.todo("Data source response with failed (unsuccessful) result");
    test.todo("Data source response with available data /records");
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
})
