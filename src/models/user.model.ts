export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: IRole[];
    updated_at: string;
    created_at: string;
}

export interface IRole {
    id: number;
    name: string;
}