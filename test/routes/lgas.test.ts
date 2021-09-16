import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db.service";
import Lga from "../../src/db/models/lga.model";
import { ILga } from "../../src/types/common";
import * as commonTestlib from "../testlibs/common.testlib";

// Test for `/lgas` URL
describe("GET /lgas ", () => {
    beforeAll(async () => {
        db.connect();
    });
    test("Should return the saved LGAs", async () => {
        // Drop collection
        await Lga.collection.drop();
        // Collection should be empty
        const emptyCollection: ILga[] = await Lga.find().lean().catch((e) => {
            throw (e);
        });
        expect(emptyCollection.length).toBe(0);

        // Prepare LGAs to be saved 
        const lgasData = [
            commonTestlib.lga1,
            commonTestlib.lga2,
        ];

        // Save LGAs
        await Lga.insertMany(lgasData).catch((e) => {
            throw (e);
        });

        // Fetch the newly inserted LGAs
        const populatedCollection: ILga[] = await Lga.find().lean().catch((e) => {
            throw (e);
        });
        // Should saved in DB
        expect(populatedCollection.length).toBe(lgasData.length);

        // Make request

        // Response status should be 200
        // Response body should contain the basic data of LGAs (without `notifiedCasesByDates`)
    });
    afterAll(async () => {
        await db.disconnect();
    });
});
