import useAuthStore from "../../stores/authStore.ts";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import { Button } from '@chakra-ui/react'

const LogoutButton = () => {
    const removeAuthData = useAuthStore((state) => state.removeData)
    const navigate = useNavigate()
    const {t} = useTranslation()
    const handleLogout = () => {
        removeAuthData()
        navigate({
            to: '/'
        }).then(() => {
            toast.success('Logged out successfully')
        })
    }

    return (
        <Button onClick={handleLogout}>
            {t('auth.logout')}
        </Button>
    );
}

export default LogoutButton;