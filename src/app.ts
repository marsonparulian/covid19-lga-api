import express, { Request, Response } from "express";
import texts from "./texts";
// Import middlewares
import lgaRouter from "./routers/lgas.router";

// This module creates express app and set middlewares

const app = express();
// Use routers
app.use("/api/lgas", lgaRouter);

// 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: texts.NOT_FOUND,
    });
});

export default app;
