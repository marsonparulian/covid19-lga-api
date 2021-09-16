import { fetchRecords, filterRecords, convertRecords, insertManyLgas } from "../../../src/crons/update-lga-cases.helper";
import updateLgaCases from "../../../src/crons/update-lga-cases";
import Lga from "../../../src/db/models/lga.model";

// Mock the module
jest.mock("../../../src/crons/update-lga-cases.helper", () => {
    // Keep the `default`
    const originalModule = jest.requireActual("../../../src/crons/update-lga-cases.helper");

    // Integer representing the order of the methods being called (starts from 0). Will be incremented when each mocked methods returning this value.
    let n = -1;

    return {
        __esModule: true,
        default: originalModule.default,
        fetchRecords: jest.fn(() => ++n),
        filterRecords: jest.fn(() => ++n),
        convertRecords: jest.fn(() => ++n),
        insertManyLgas: jest.fn(() => ++n),
    }
});
// Mock LgaModel module
jest.mock("../../../src/db/models/lga.model", () => {
    // Only set required property
    return {
        __esModule: true,
        default: {
                    collection: {
            drop: jest.fn(() => null),
        },
        },

    };
});

// Test for update LGA test cases with mocked module
describe("Test updating LGA test cases (mocked modules)", () => {
    // Test `updateLgaCases` to call required methods in order. The mocked methods should  return an integer representing the  order funcstion being called, starting from 0
    test("Should call methods in order", async () => {
        // Run method to update LGAs
        await updateLgaCases();

        // `LgaModel.collection.drop` should have been called once
        expect(Lga.collection.drop).toHaveBeenCalledTimes(1);

        // Assert each required methods are called in order sequentially
        const methods = [
            fetchRecords, filterRecords, convertRecords, insertManyLgas,
        ]; // The methods in order
        // Assert
        for (let i = 0; i < methods.length; i++) {
            // Should have been called once
            try {
                expect(methods[i]).toHaveBeenCalledTimes(1);
            } catch (e) {
                console.error(`Failed in asserting methods indexed ${i}`);
                throw (e);
            }
            // Should have returned the order
            try {
                expect(methods[i]).toHaveReturnedWith(i);
            } catch (e) {
                console.error(`Failed in asserting methods indexed ${i}`);
                throw (e);
            }
        }
    });
});
