import supertest from "supertest";
import app from "../../../src/app";
import db from "../../../src/services/db.service";
import texts from "../../../src/texts";

// This file contain tests for `/lgas/cases` handler
describe("Route `/lgas/cases` tests", () => {
    beforeAll(async () => {
        // Connect to db
        await db.connect();

        // TODO Drop collection 

        // TODO Insert sample Data
    });
    test.todo("Missing `lgaIds` in query params. Should respon with 'Bad Request'");
    test.todo("Empty `lgaIds` in query params. Should respond with 'Bad Request'");
    test.todo("Single `lgaIds` in query params.");
    test.todo("Multiple `lgaIds` in query params.");
    afterAll(async () => {
        await db.disconnect();
    })
});
