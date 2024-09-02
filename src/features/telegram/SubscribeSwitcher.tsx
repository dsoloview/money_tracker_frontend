import {IUserNewsletter} from "@/models/newsletter.model.ts";
import {Switch} from "@/ui/switch.tsx";
import {
    useSubscribeUserNewsletter,
    useUnsubscribeUserNewsletter
} from "@/api/endpoints/user/newsletter/userNewsletter.ts";
import useUserState from "@/hooks/useUserState.ts";

type Props = {
    userNewsletter: IUserNewsletter
}
const SubscribeSwitcher = ({userNewsletter}: Props) => {
    const user = useUserState()
    const {mutate: subscribe} = useSubscribeUserNewsletter(user.id)
    const {mutate: unsubscribe} = useUnsubscribeUserNewsletter(user.id)
    const handleSubscribedChange = (checked: boolean) => {
        if (checked) {
            subscribe(userNewsletter.id)
        } else {
            unsubscribe(userNewsletter.id)
        }
    }


    return (
        <Switch onCheckedChange={handleSubscribedChange} id={`userNewsletter-${userNewsletter.id}`}
                checked={userNewsletter.subscribed}/>
    )
}

export default SubscribeSwitcher;