// Common types / interfaces used throughout app.

/**
 * Number of notified cases by date.
 */
export interface ICasesByDate {
    date: string;
    cases: number;
}
/**
 * LGA interface
 */
export interface ILga {
    _id: string;
    code19: string;
    name19: string;
    notifiedCasesByDates: ICasesByDate[];
}
