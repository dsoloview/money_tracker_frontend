import SubscribeSwitcher from "@/features/telegram/SubscribeSwitcher.tsx";
import {IUserNewsletter} from "@/models/newsletter.model.ts";
import PeriodSelect from "@/features/telegram/PeriodSelect.tsx";

type Props = {
    userNewsletter: IUserNewsletter
}
const TelegramNotification = ({userNewsletter}: Props) => {
    return (
        <div key={userNewsletter.id} className="flex items-center justify-between space-x-2">
            <span>{userNewsletter.newsletter.name}</span>
            <PeriodSelect userNewsletter={userNewsletter}/>
            <SubscribeSwitcher userNewsletter={userNewsletter}/>
        </div>
    )
}

export default TelegramNotification;