import {IUser} from "./user.model.ts";

export interface IResponse<T> {
    data: T;
}

export interface IPaginationResponse<T> extends IResponse<T> {
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface IMinMax {
    min: number;
    max: number;
}

export interface IAuthResponse {
    access_token: string;
    token_type: string;
    user: IUser;
}

export interface IErrorResponse {
    type: string;
    message: string;
}

export interface ISuccessResponse {
    success: boolean;
}

export interface IValidationErrorResponse<T> extends IErrorResponse {
    errors: {
        [K in keyof T]: T[K] extends object
            ? { [K2 in keyof T[K]]: string }
            : string;
    };
}