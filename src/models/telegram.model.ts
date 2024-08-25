export interface ITelegramToken {
    token: string;
}

export interface ITelegramUser {
    id: number;
    telegram_id: number;
    chat_id: number;
    username: string;
    created_at: string;
    updated_at: string;
}
