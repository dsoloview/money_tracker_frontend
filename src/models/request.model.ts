export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    settings: {
        main_currency_id: number;
        language_id: number;
    };
}

export interface IIdRequest {
    id: number;
}

export interface IParamRequest<T> extends IIdRequest {
    data: T;
}

export interface IParamTableGetRequest extends IIdRequest {
    page: number;
    sort: string;
    direction: string;
}

export interface IUpdateUserRequest {
    name: string;
    email: string;
    settings: {
        main_currency_id: number;
        language_id: number;
    };
}

export interface IUpdatePasswordRequest {
    current_password: string;
    password: string;
    password_confirmation: string;
}