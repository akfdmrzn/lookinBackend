import { DomainError } from "../domain.error";
export declare const API_ERRORS: {
    [key: string]: Pick<DomainError, 'message' | 'statusCode'>;
};
