import supertest from "supertest";
import app from "../../../src/app";
import db from "../../../src/services/db.service";
import texts from "../../../src/texts";
import Lga from "../../../src/db/models/lga.model";
import * as commonTestLib from "../../testlibs/common.testlib";

// Increase timeout
jest.setTimeout(12000);

// This file contain tests for `/lgas/cases` handler
describe("Route `/lgas/cases` tests", () => {
    // Sample data
    const lgaData = [
        commonTestLib.lga1, commonTestLib.lga2, commonTestLib.lga3
    ];
    beforeAll(async () => {
        // Connect to db
        await db.connect();

        // Drop collection 
        await Lga.collection.drop();

        // TODO Insert sample Data 
        await Lga.insertMany(lgaData).catch((e) => {
            throw (e);
        });

    });
    test("Missing `lgaIds` in query params. Should respon with 'Bad Request'", async () => {
        // Make request
        const response = await supertest(app)
            .get("/api/lgas/cases").catch((e) => {
                throw (e);
            });

        // Should be 400
        expect(response.status).toBe(400);
        // Response.body should contain expected 'message' 
        expect(response.body).toEqual({
            message: texts.BAD_REQUEST,
        })
    });
    test("Empty `lgaIds` in query params. Should respond with 'Bad Request'", async () => {
        // Make request with empty `lgaIds`
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: [''],
            });

        // Should be 400
        expect(response.status).toBe(400);
        // Response body should contains `message` 
        expect(response.body).toEqual({
            message: texts.BAD_REQUEST,
        })
    });
    test("`lgaIds` is not an array. Should be `ok` (converted to array)", async () => {
        // Make request with `lgaIds` as string
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: "random-id"
            });

        // Should be 200
        expect(response.status).toBe(200);
        // Should respond with `message`
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.SUCCESS,
        }));
    });
    test("`lgaIds` in query params is a number not a string", async () => {
        // Make request with `lgaIds` as number
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: [2, 3, 4],
            }).catch((e) => {
                throw (e);
            });

        // Should be 200
        expect(response.status).toBe(200);
        // Response.body should contain 'message'
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.SUCCESS,
            lgas: [],
        }))
    });
    test("Single `lgaIds` in query params.", async () => {
        // Make request with single lga id
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: [lgaData[1]._id, "marson"]
            }).catch((e) => {
                throw (e);
            });

        // Should be 200
        expect(response.status).toBe(200);
        // Respon.body should contain `message` and expected `lgas`
        expect(response.body).toEqual({
            message: texts.SUCCESS,
            lgas: expect.any(Array),
        })
        // The `lgas` should only contain 1 element matching the `lgaIds` in query
        const expectedNotifiedCasesByDates = lgaData[1].notifiedCasesByDates.map(n => {
            return expect.objectContaining(n);
        });
        expect(response.body.lgas).toEqual([
            expect.objectContaining(
                Object.assign({}, lgaData[1], {
                    notifiedCasesByDates: expectedNotifiedCasesByDates,
                })
            )
        ]);
    });
    test("Multiple `lgaIds` in query params.", async () => {
        // Define which lgass to fetch
        const toBeFetchedLgas = [lgaData[1], lgaData[2]];

        // Make request to fetch lgas
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: toBeFetchedLgas.map((v) => v._id),
            }).catch((e) => {
                throw (e);
            });

        // Should be 200
        expect(response.status).toBe(200);
        // Response body should have `message` & `lgas` properties
        expect(response.body).toEqual({
            message: texts.SUCCESS,
            lgas: expect.any(Array),
        });
        // Response.body.lgas should have 2 elements
        expect(response.body.lgas.length).toBe(toBeFetchedLgas.length);
        // Iterate through each `toBeFetchLgas` (as in query params)
        toBeFetchedLgas.forEach(lga => {
            // Should be included in Response.body.lgas
            expect(response.body.lgas).toContainEqual(expect.objectContaining(
                // Compare all properties of `lga`, except `notifiedCasesByDates`
                Object.assign({}, lga, {
                    // Convert to `expect.objectContaining` because there is additional `_id` property in `CasesByDate` document.
                    notifiedCasesByDates: lga.notifiedCasesByDates.map(v => expect.objectContaining(v)),
                }),
            ));
        });
    });
    afterAll(async () => {
        await db.disconnect();
    })
});
