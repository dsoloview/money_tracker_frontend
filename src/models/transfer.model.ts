import {IAccount} from "./account.model.ts";

export interface ITransferRequest {
    account_from_id: number;
    account_to_id: number;
    amount_from: number;
    amount_to: number;
    date: string;
    comment?: string;
}

export interface ITransfer {
    id: number;
    account_from: IAccount;
    account_to: IAccount;
    amount_from: number;
    amount_to: number;
    date: string;
    comment?: string;
    created_at: string;
    updated_at: string;
}