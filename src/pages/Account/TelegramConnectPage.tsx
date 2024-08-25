import AccountLayout from "@/layouts/AccountLayout.tsx";
import useUserState from "@/hooks/useUserState.ts";
import {useGetTelegramUser, useGetUserTelegramToken} from "@/api/endpoints/user/telegram/userTelegram.ts";
import {useTranslation} from "react-i18next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/ui/card.tsx";
import {Spinner} from "@/ui/spinner.tsx";
import CopyButton from "@/widgets/buttons/CopyButton.tsx";
import {Button} from "@/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import TelegramConnectStep from "@/features/telegram/connect/TelegramConnectStep.tsx";

function TelegramConnectPage() {
    const {id} = useUserState();
    const {t} = useTranslation();
    const {data, isPending} = useGetUserTelegramToken(id);
    const {refetch, isLoading, isSuccess} = useGetTelegramUser(id, false);
    const navigate = useNavigate();

    const handleAuthorizationCheck = async () => {
        await refetch();
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/account/telegram");
        }
    }, [isSuccess]);

    return (
        <AccountLayout>
            <div className="flex justify-center items-center h-[100%]">
                <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                            {t("telegram.telegramToken.title")}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            {t("telegram.telegramToken.description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4 space-y-4">
                        <div className="flex justify-center items-center">
                            {isPending ? (
                                <Spinner className="w-6 h-6 text-sky-500"/>
                            ) : (
                                <div className="p-3 bg-gray-100 rounded-md flex items-center space-x-3">
                <span className="text-lg font-medium text-gray-700">
                  {data?.data.token}
                </span>
                                    <CopyButton textToCopy={data?.data.token || ""}/>

                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            {t("telegram.telegramToken.steps", {returnObjects: true}).map(
                                (step: string, index: number) => (
                                    <TelegramConnectStep step={step} key={index}/>
                                )
                            )}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button
                                onClick={handleAuthorizationCheck}
                                variant="blue"
                                isLoading={isLoading}
                            >
                                {t("telegram.telegramToken.checkAuthorization")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AccountLayout>
    );
}

export default TelegramConnectPage;
