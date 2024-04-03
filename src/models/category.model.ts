import {IUser} from "./user.model.ts";
import {IIcon} from "./icon.model.ts";

export interface ICategory {
    id: number;
    parent_category?: ICategory;
    children?: ICategory[];
    user?: IUser;
    icon?: IIcon;
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

export interface ICategoryRequest {
    name: string;
    type: CategoryTransactionType;
    icon_id?: number;
    description?: string;
    parent_category_id?: number;
}