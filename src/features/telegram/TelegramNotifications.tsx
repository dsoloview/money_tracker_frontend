import {ITelegramUser} from "@/models/telegram.model.ts";
import {useGetUserNewsletters} from "@/api/endpoints/user/newsletter/userNewsletter.ts";
import useUserState from "@/hooks/useUserState.ts";
import TelegramNotification from "@/features/telegram/TelegramNotification.tsx";

type Props = {
    telegramUser: ITelegramUser
}
const TelegramNotifications = ({telegramUser}: Props) => {
    const user = useUserState()
    const {data} = useGetUserNewsletters(user.id);

    return (
        <div>
            <div className="flex flex-col justify-center gap-3">
                {data && data.data.map((userNewsletter) => (
                    <TelegramNotification key={userNewsletter.id} userNewsletter={userNewsletter}/>
                ))}
            </div>
        </div>
    )
}

export default TelegramNotifications;