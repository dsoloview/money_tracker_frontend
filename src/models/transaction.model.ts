import {IAccount} from "./account.model.ts";
import {CategoryTransactionType, ICategory} from "./category.model.ts";

export interface ITransaction {
    id: number;
    account_id: number;
    comment: string;
    amount: number;
    type: CategoryTransactionType;
    account: IAccount;
    categories: ICategory[];
    date: string;
    created_at: string;
    updated_at: string;
}

export interface ITransactionRequest {
    account_id: number;
    comment: string;
    amount: number;
    categories_ids: number[];
    date: string;
    type: CategoryTransactionType;
}