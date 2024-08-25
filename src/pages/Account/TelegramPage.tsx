import AccountLayout from "@/layouts/AccountLayout.tsx";
import useUserState from "@/hooks/useUserState.ts";
import {useGetTelegramUser} from "@/api/endpoints/user/telegram/userTelegram.ts";
import {Navigate} from "react-router-dom";
import {Spinner} from "@/ui/spinner.tsx";

function TelegramPage() {
    const user = useUserState();
    const {data, isError, isLoading} = useGetTelegramUser(user.id);

    if (isError) {
        return <Navigate to={"/account/telegram/connect"}/>
    }

    return (
        <AccountLayout>
            {isLoading ? (
                <Spinner/>
            ) : (
                <div>
                    <div>Telegram</div>
                    <div>{data?.data.username}</div>
                </div>
            )}
        </AccountLayout>
    );
}

export default TelegramPage;
