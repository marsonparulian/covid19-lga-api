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
    _id: string;  // `code19`
    code19: string; // Will be removed in the future since `coe19` is used as `_id`
    name19: string;
    notifiedCasesByDates: ICasesByDate[];
}
