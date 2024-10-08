import useAuthStore from "@/stores/authStore.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useLogout} from "@/api/endpoints/auth/auth.api.ts";
import {useEffect} from "react";
import {Button} from "@/ui/button.tsx";

const LogoutButton = () => {
    const removeAuthData = useAuthStore((state) => state.removeData)
    const navigate = useNavigate()
    const {t} = useTranslation()
    const {mutate, isSuccess} = useLogout()
    const handleLogout = () => {
        mutate()
    }

    useEffect(() => {
        if (isSuccess) {
            removeAuthData()
            navigate('/')
        }
    }, [isSuccess]);

    return (
        <Button onClick={handleLogout}>
            {t('auth.logout')}
        </Button>
    );
}

export default LogoutButton;