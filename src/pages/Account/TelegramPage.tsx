import AccountLayout from "@/layouts/AccountLayout.tsx";
import useUserState from "@/hooks/useUserState.ts";
import {useGetTelegramUser, useLogoutTelegramUser} from "@/api/endpoints/user/telegram/userTelegram.ts";
import {Navigate} from "react-router-dom";
import {Spinner} from "@/ui/spinner.tsx";
import TelegramUser from "@/features/telegram/TelegramUser.tsx";
import TelegramNotifications from "@/features/telegram/TelegramNotifications.tsx";
import {Button} from "@/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/ui/card.tsx";
import {useTranslation} from "react-i18next";

function TelegramPage() {
    const user = useUserState();
    const {data, isError, isLoading} = useGetTelegramUser(user.id);
    const {mutate} = useLogoutTelegramUser(user.id);
    const {t} = useTranslation();

    if (isError) {
        return <Navigate to={"/account/telegram/connect"}/>
    }

    if (isLoading || !data) {
        return (
            <AccountLayout>
                <Spinner/>
            </AccountLayout>
        )
    }

    const handleLogout = () => {
        mutate();
    }

    return (
        <AccountLayout>
            <h1 className="text-2xl font-bold">{t('telegram.title')}</h1>
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl min-h-40 max-lg:grid-cols-1 max-lg:grid-rows-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('telegram.telegramUser.title')}</CardTitle>
                            <CardDescription>{t('telegram.telegramUser.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TelegramUser telegramUser={data.data}/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('telegram.telegramNotifications.title')}</CardTitle>
                            <CardDescription>{t('telegram.telegramNotifications.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TelegramNotifications telegramUser={data.data}/>
                        </CardContent>
                    </Card>
                </div>

                <Button className="mt-6 w-[300px]" onClick={handleLogout}>{t('auth.logout')}</Button>
            </div>
        </AccountLayout>
    );
}

export default TelegramPage;
