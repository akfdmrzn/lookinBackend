import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../errors';
export declare const errorHandlerMiddleware: (error: DomainError | Error | any, req: Request, res: Response, next: NextFunction) => void;
