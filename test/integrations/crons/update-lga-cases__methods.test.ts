import { fetchRecords, filterRecords, convertRecords, insertManyLgas } from "../../../src/crons/update-lga-cases.helper";
import dbService from "../../../src/services/db.service";
import Lga from "../../../src/db/models/lga.model";
import { ILga } from "../../../src/types/common";
import { IRecord } from "../../../src/types/dataSource";
import { record1, record2, record3 } from "../../testlibs/dataSource.testlib";

// Increase timeout since one of test will require to fetch from data source.
jest.setTimeout(12000);

// (Separately) test methods for updating LGA cases
describe("Update LGA cases methods (separately)", () => {
    // Persist converted lgas to used in 'save' test.
    let toBeSavedLgas: ILga[];
    test.todo("Data source response with failed (unsuccessful) result");
    /*
        test("fetchRecords - successful", async () => {
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
        test("Test data 'record1', 'record2', and 'record3' should not have the same LGA", () => {
            expect(record1.lga_code19).not.toBe(record2.lga_code19);
            expect(record1.lga_code19).not.toBe(record3.lga_code19);
            expect(record2.lga_code19).not.toBe(record3.lga_code19);
        });
        test("With basic test data", () => {
            // Prepare data test
            const records = [record1, record2, record3];

            // Process / convert
            const lgas = convertRecords(records);

            // Should be 3 lgas
            expect(lgas.length).toBe(3);
            // Assert the first LGA
            expect(lgas[0]).toEqual(expect.objectContaining({
                code19: record1.lga_code19,
                name19: record1.lga_name19,
                notifiedCasesByDates: [
                    {
                        date: record1.notification_date,
                        cases: record1.cases
                    }
                ],
            }));
            // Assert the second LGA
            expect(lgas[1]).toEqual(expect.objectContaining({
                code19: record2.lga_code19,
                name19: record2.lga_name19,
                notifiedCasesByDates: [{
                    date: record2.notification_date,
                    cases: record2.cases,
                }],
            }));
            // Assert the third LGA
            expect(lgas[2]).toEqual(expect.objectContaining({
                code19: record3.lga_code19,
                notifiedCasesByDates: [{
                    date: record3.notification_date,
                    cases: record3.cases,
                }],

            }));
        });
        test("With 2 LGAs have multiple records", () => {
            // Create dummy records so some LGAs have multiple records
            const record1Dummy: IRecord = Object.assign({}, record1, {
                notification_date: "2022-12-24",
            });
            const record3Dummy = Object.assign({}, record3, {
                notification_date: "2015-04-18",
            });

            // Construct records
            const records: IRecord[] = [
                record1,
                record2,
                record3Dummy,
                record1Dummy,
                record3,
            ];

            // Convert 
            const lgas = convertRecords(records);

            // Check number of LGAs 
            expect(lgas.length).toBe(3);
            // Assert the first LGA
            expect(lgas[0]).toEqual(expect.objectContaining({
                code19: record1.lga_code19,
                name19: record1.lga_name19,
                notifiedCasesByDates: [
                    {
                        date: record1.notification_date,
                        cases: record1.cases,
                    }, {
                        date: record1Dummy.notification_date,
                        cases: record1Dummy.cases,
                    }
                ],
            }));
            // Assert the second LGA
            expect(lgas[1]).toEqual(expect.objectContaining({
                code19: record2.lga_code19,
                name19: record2.lga_name19,
                notifiedCasesByDates: [{
                    date: record2.notification_date,
                    cases: record2.cases,
                }],
            }));
            // Assert the third LGA
            expect(lgas[2]).toEqual(expect.objectContaining({
                code19: record3Dummy.lga_code19,
                name19: record3.lga_name19,
                notifiedCasesByDates: [
                    {
                        date: record3Dummy.notification_date,
                        cases: record3Dummy.cases,
                    }, {
                        date: record3.notification_date,
                        cases: record3.cases,
                    }
                ],
            }));

            // Persis the converted Lgas to be used in in the next test
            toBeSavedLgas = lgas;
        });
    });
    test("Save LGAs", async () => {
        // Connect to DB   
        await dbService.connect().catch((e) => {
            throw (e);
        });

        // Drop DB
        await dbService.dropDatabase().catch((e) => {
            throw (e);
        });

        // Save LGAs converted from records
        const savedLgas: ILga[] = await insertManyLgas(toBeSavedLgas).catch((e) => {
            throw (e);
        });

        // The save result should be identical with the provided `lgas`
        // The Saved result should have the same number of elements
        expect(savedLgas.length).toBe(toBeSavedLgas.length);
        // Iterate through elements to assert each element
        savedLgas.forEach((lga, lgaKey) => {
            // Assert the lga
            expect(lga).toEqual(expect.objectContaining({
                _id: toBeSavedLgas[lgaKey].code19,
                name19: toBeSavedLgas[lgaKey].name19,
            }));

            // Iterate through the `notifiedCasesByDates`
            lga.notifiedCasesByDates.forEach((notified, notifiedKey) => {
                // Assert the `notifiedCasesByDates` element
                const n = toBeSavedLgas[lgaKey].notifiedCasesByDates[notifiedKey];
                expect(notified).toEqual(expect.objectContaining(n));
            });
        });

        // Fetch LGA from DB 
        const fetchedLgas: ILga[] = await Lga.find().lean().catch(e => {
            throw (e);
        });

        // Assert the LGAs exist in DB
        // Assert the fetched Lgas has the same number element with the `savedLgas`
        expect(fetchedLgas.length).toBe(savedLgas.length);
        // Assert the `fetchedLgas` is identical with the `savedLgas`
        // Iterate through the `savedLgas`
        savedLgas.forEach((savedLga) => {
            // Should found object with same values in `fetchedLgas`
            const foundLga = fetchedLgas.find(fetchedLga => (
                savedLga._id === fetchedLga._id
                && savedLga.name19 === fetchedLga.name19
            ));

            // If Lga not found, test is failed
            if (!foundLga) throw new Error(`LGA not found : ${savedLga.name19}`);

            // Iterate through the `savedLga.notifiedCasesByDates`
            savedLga.notifiedCasesByDates.forEach(savedN => {
                // Should exist in `fetchedLga.notifiedCasesByDates`
                if (!foundLga.notifiedCasesByDates.some(fetchedN => (
                    savedN.date === fetchedN.date
                    && savedN.cases === fetchedN.cases
                ))) throw new Error("Not found in `fetched.notifiedCasesByDates`");
            });
        });

        // Disconnect DB
        await dbService.disconnect();
    });
});
