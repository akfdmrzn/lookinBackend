import { NextFunction, Request, Response } from "express";
import { ClassConstructor } from 'class-transformer';
export declare const dtoValidationMiddleware: (classSign: ClassConstructor<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
