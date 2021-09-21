import express, { Request, Response } from "express";
import texts from "./texts";
import swaggerUiExpress from "swagger-ui-express";
import swaggerFile from "./doc/swagger.json";
// Import middlewares
import lgaRouter from "./routers/lgas.router";

// This module creates express app and set middlewares

const app = express();
// Use routers
app.use("/api/lgas", lgaRouter);

// Documentation
app.use("/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: texts.NOT_FOUND,
    });
});

export default app;
