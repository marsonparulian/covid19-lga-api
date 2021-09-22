import updateLgaCases from "./update-lga-cases";

/**
 * This script will be used as `npm script` to update lga cases.
 */
updateLgaCases()
    .catch((e: any) => {
        console.error("Failed updating LGA cases. Reason :");
        console.error(e.message ?? e);
    });
