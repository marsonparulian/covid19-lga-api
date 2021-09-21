const { exit } = require("process");
const swaggerAutogen = require("swagger-autogen");
require("dotenv").config();

// Paths are relative to root dir
const outputFile = "src/doc/swagger.json";
const endpointFile = ["src/app.ts"];

// Check prerequisites
if (!process.env.A_FULL_HOST) {
    console.error("Missing env variables : 'A_FULL_HOST'");
    exit();
}

// Swagger document options
const doc = {
    info: {
        version: "1.0.0",
        title: "Covid-19 LGA API",
        description: "A simple Covid19 by LGA API. This API provides number of cases per LGA and per days. The number of previous days is kept to minimum (7 days) to minimize the size of DB. The data is fetched everyday from NSW Covid-19 API triggered by github actions.",
    },
    host: `${process.env.A_FULL_HOST}`,
    schemes: ['https', 'http'],
    consumes: ["application/json"],
    tags: [
        { name: "LGA", description: "Local government area and number of cases per recent days" }
    ],
    definitions: {
        Lga: {
            _id: "123",
            name19: "South Town",
            notifiedCasesByDates: [
                { date: "2021-08-03", cases: 23 },
                { date: "2021-08-05", cases: 31 },
            ],
        },
    },
};

// Generate swagger json
swaggerAutogen()(outputFile, endpointFile, doc);

