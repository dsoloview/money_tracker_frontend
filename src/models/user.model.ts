import {ICurrency} from "./currency.model.ts";
import {ILanguage} from "./language.model.ts";

export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: IRole[];
    settings: IUserSettings;
    updated_at: string;
    created_at: string;
}

export interface IRole {
    id: number;
    name: string;
}

export interface IUserSettings {
    id: number;
    main_currency: ICurrency
    language: ILanguage
}