import {IUser} from "@/models/user.model.ts";

export interface INewsletter {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    availablePeriods: IAvailablePeriods;
    availableChannels?: INewsletterChannel[];
    users?: IUser[];
}

export interface IAvailablePeriods {
    OFF: string
    DAILY: string
    WEEKLY: string
    MONTHLY: string
}

export interface INewsletterChannel {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;

    availableNewsletters?: INewsletter[];
}

export interface IUserNewsletter {
    id: number;
    subscribed: boolean;
    period: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    newsletter_id: number;
    channel_id: number;
    channel: INewsletterChannel;
    newsletter: INewsletter;
    user: IUser;
}

export interface IUserNewsletterUpdateRequest {
    period: string;
}

