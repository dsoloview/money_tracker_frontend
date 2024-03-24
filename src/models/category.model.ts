import {IUser} from "./user.model.ts";

export interface ICategory {
    id: number;
    parent_category?: ICategory;
    children?: ICategory[];
    user?: IUser;
    icon: string;
    name: string;
    type: CategoryTransactionType;
    description: string;
    created_at: string;
    updated_at: string;
}

export enum CategoryTransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export interface ICategoryCreateRequest {
    name: string;
    type: CategoryTransactionType;
    icon: string;
    description: string;
    parent_category_id?: number;
}