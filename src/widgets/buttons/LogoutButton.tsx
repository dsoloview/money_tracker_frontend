import useAuthStore from "../../stores/authStore.ts";
import {useTranslation} from "react-i18next";
import {Button} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const removeAuthData = useAuthStore((state) => state.removeData)
    const navigate = useNavigate()
    const {t} = useTranslation()
    const handleLogout = () => {
        navigate('/')
        removeAuthData()
    }

    return (
        <Button colorScheme="blue" onClick={handleLogout}>
            {t('auth.logout')}
        </Button>
    );
}

export default LogoutButton;