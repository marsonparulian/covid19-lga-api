import supertest from "supertest";
import app from "../../src/app";
import texts from "../../src/texts";

// Tests for non  routed (not handled by Router) request
describe("App.ts (non routed request)", () => {
    test("Should be 404", async () => {
        // Make request with non existing url
        const response = await supertest(app)
            .get("/random-url")
            .catch((e) => {
                throw (e);
            });
        // Should response with 404
        expect(response.status).toBe(404);
        // Should contain `message`
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.NOT_FOUND,
        }))

    });
});
