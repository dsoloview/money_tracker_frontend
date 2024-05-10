import {useGetUser} from "@/api/endpoints/user/user.api.ts";
import useUserState from "@/hooks/useUserState.ts";

const UserInfo = () => {
    const user = useUserState();
    const {data} = useGetUser(user.id);

    return (
        <div
            className="flex items-center justify-center flex-col mr-4"
        >
            <span>
                {data.data.name}
            </span>
            <span
                className="text-2xl font-bold">
                {data.data.balance} {data.data.settings.main_currency.symbol}
            </span>

        </div>
    )
}

export default UserInfo;