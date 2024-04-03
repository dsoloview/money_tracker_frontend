import {IAccount} from "./account.model.ts";
import {CategoryTransactionType, ICategory} from "./category.model.ts";
import {ICurrency} from "./currency.model.ts";
import {IPaginationResponse} from "./response.model.ts";

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

export interface ITransactionsInfo {
    currency: ICurrency,
    total_expense: number;
    total_income: number;
    min_transaction: number;
    max_transaction: number;
}

export interface ITransactionWithInfoResponse<T> extends IPaginationResponse<T> {
    info: ITransactionsInfo;
}

export interface IIdRequest {
    id: number;
}