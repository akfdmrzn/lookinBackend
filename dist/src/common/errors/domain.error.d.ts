import { StatusCodes } from "http-status-codes";
export declare class DomainError extends Error {
    constructor(error: {
        message: string;
        statusCode: StatusCodes;
        causes?: any;
    });
    statusCode: number;
    causes: any;
}
