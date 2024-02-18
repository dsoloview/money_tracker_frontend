import {IErrorResponse, IValidationErrorResponse} from "./response.model.ts";

export interface IError<T> {
    status: number;
    data: IErrorResponse | IValidationErrorResponse<T>
}