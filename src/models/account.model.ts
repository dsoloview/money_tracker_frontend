import {ICurrency} from "./currency.model.ts";

export interface IAccount {
    id: number;
    name: string;
    bank: string;
    balance: number;
    currency: ICurrency;
    created_at: string;
    updated_at: string;
}

export interface IAccountCreateUpdateRequest {
    name: string;
    bank: string;
    balance: number;
    currency_id: number;
}