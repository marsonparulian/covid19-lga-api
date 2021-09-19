import { ILga } from "../../src/types/common";

// This file contains common sample data  used for tests

export const lga1: ILga = {
    _id: "123",
    code19: "123",
    name19: "Southbank",
    notifiedCasesByDates: [
        { date: "2021-06-01", cases: 1 },
    ],
};
export const lga2: ILga = {
    _id: "453",
    code19: "453",
    name19: "Northcoast",
    notifiedCasesByDates: [
        { date: "2021-06-03", cases: 2 },
        { date: "2021-06-05", cases: 3 },
    ],
}
export const lga3: ILga = {
    _id: "1200",
    code19: "1200",
    name19: "Bradfield",
    notifiedCasesByDates: [
        { date: "2021-06-08", cases: 31 },
        { date: "2021-06-20", cases: 23 },
        { date: "2021-07-01", cases: 59 },
    ],
}
