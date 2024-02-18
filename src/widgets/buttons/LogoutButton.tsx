import {Button} from "@nextui-org/react";
import useAuthStore from "../../stores/authStore.ts";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "react-toastify";

const LogoutButton = () => {
    // const authData = useAuthStore((state) => state.authData)
    const removeAuthData = useAuthStore((state) => state.removeData)
    const navigate = useNavigate()
    const handleLogout = () => {
        removeAuthData()
        navigate({
            to: '/'
        }).then(() => {
            toast.success('Logged out successfully')
        })
    }

    return (
        <Button onPress={handleLogout} color="primary" href="#" variant="flat">
            Logout
        </Button>
    );
}

export default LogoutButton;