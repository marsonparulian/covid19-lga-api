import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db.service";
import Lga from "../../src/db/models/lga.model";
import { ILga } from "../../src/types/common";
import * as commonTestlib from "../testlibs/common.testlib";
import texts from "../../src/texts";

// Increase timeout
jest.setTimeout(1200);

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
        const response = await supertest(app)
            .get("/api/lgas").catch((e) => {
                throw (e);
            });

        // Response status should be 200
        expect(response.status).toBe(200);
        // Response body should contain expected format
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.SUCCESS,
            lgas: expect.any(Array),
        }));
        // Response body.lgas should contain same number of element with `lgaData`
        expect(response.body.lgas.length).toBe(lgasData.length);
        // Iterate through LGAs  data
        lgasData.forEach((lga) => {
            // Response body should contain the basic data of LGAs (without `notifiedCasesByDates`)
            expect(response.body.lgas).toEqual(expect.arrayContaining([{
                _id: lga._id,
                name19: lga.name19,
            }]));
        });

    });
    afterAll(async () => {
        await db.disconnect();
    });
});
