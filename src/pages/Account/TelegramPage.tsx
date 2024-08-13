import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Link} from "react-router-dom";
import useUserState from "../../hooks/useUserState.ts";
import {useGetUserTelegramToken} from "@/api/endpoints/user/telegram/accountTelegram.ts";
import {Spinner} from "@/ui/spinner.tsx";

function TelegramPage() {
    const user = useUserState();
    const {data, isPending} = useGetUserTelegramToken(user.id);
    return (
        <AccountLayout>
            <Link to="/telegram">Telegram</Link>
            <div className="grid grid-cols-1 gap-4">
                {isPending ? (
                    <Spinner/>
                ) : (
                    <div>{data?.data.token}</div>
                )}
            </div>
        </AccountLayout>
    );
}

export default TelegramPage;
