import supertest from "supertest";
import app from "../../../src/app";
import db from "../../../src/services/db.service";
import texts from "../../../src/texts";

// Increase timeout
jest.setTimeout(12000);

// This file contain tests for `/lgas/cases` handler
describe("Route `/lgas/cases` tests", () => {
    beforeAll(async () => {
        // Connect to db
        await db.connect();

        // TODO Drop collection 

        // TODO Insert sample Data
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
    test("`lgaIds` is not an array. Should respond with 'Bad request'", async () => {
        // Make request with `lgaIds` as string
        const response = await supertest(app)
            .get("/api/lgas/cases")
            .query({
                lgaIds: "random-id"
            });

        // Should be 400
        expect(response.status).toBe(400);
        // Should respond with `message`
        expect(response.body).toEqual({
            message: texts.BAD_REQUEST,
        });
    });
    test.todo("Single `lgaIds` in query params.");
    test.todo("Multiple `lgaIds` in query params.");
    afterAll(async () => {
        await db.disconnect();
    })
});
