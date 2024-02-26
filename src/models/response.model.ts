import {IUser} from "./user.model.ts";

export interface IResponse<T> {
    data: T;
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