// This is the entry file to start server
import app from "./app";
import db from "./services/db.service";
import "dotenv/config";

// Start DB
console.log("Connectin to DB..");
db.connect()
    .then(() => {
        console.log("DB is connected.");

        // Start app
        console.log("Starting server..");
        const port = 3000;
        app.listen(port, () => {
            console.log(`Server is started on port ${port}`);
        });
    }).catch((e) => {
        console.error("error connecting DB.");
        console.error(e.message);
    });

