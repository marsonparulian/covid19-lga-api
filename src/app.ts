import express, { Request, Response } from "express";
import texts from "./texts";

// This module creates express app and set middlewares

const app = express();

// 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: texts.NOT_FOUND,
    });
});

export default app;
