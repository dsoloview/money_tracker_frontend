import {ITelegramUser} from "@/models/telegram.model.ts";

type Props = {
    telegramUser: ITelegramUser
}

const TelegramUser = ({telegramUser}: Props) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <span className="font-medium">Telegram ID:</span>
                <span className="text-gray-700">{telegramUser.telegram_id}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="font-medium">Username:</span>
                <span className="text-gray-700">{telegramUser.username}</span>
            </div>
        </div>
    );
}

export default TelegramUser;