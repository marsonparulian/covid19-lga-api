import updateLgaCases from "./update-lga-cases";

/**
 * This script will be used as `npm script` to update lga cases.
 */
try {
    updateLgaCases();
} catch (e: any) {
    console.error(e.message ? e.message : e);
}
