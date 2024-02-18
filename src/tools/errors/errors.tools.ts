import {IError} from "../../models/error.model.ts";
import {IValidationErrorResponse} from "../../models/response.model.ts";

function isIError(error: unknown): error is IError<unknown> {
    return typeof error === 'object'
        && error != null
        && 'status' in error
        && 'data' in error
        && typeof error.data === 'object'
}

function isIValidationErrorResponse(errorData: unknown): errorData is IValidationErrorResponse<unknown> {
    return typeof errorData === 'object'
        && errorData != null
        && 'type' in errorData
        && 'message' in errorData
        && 'errors' in errorData
        && typeof errorData.errors === 'object'
}

export { isIError, isIValidationErrorResponse }