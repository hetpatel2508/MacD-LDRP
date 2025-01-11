import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware: any = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.log("Error caught by middleware");
    
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}