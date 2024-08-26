import {ITelegramUser} from "@/models/telegram.model.ts";

type Props = {
    telegramUser: ITelegramUser
}
const TelegramNotifications = ({telegramUser}: Props) => {
    return (
        <div>
            <div>Telegram</div>
            <div>{telegramUser.username}</div>
        </div>
    )
}

export default TelegramNotifications;