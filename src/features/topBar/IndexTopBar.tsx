import useAuthStore from "@/stores/authStore.ts";
import {useTranslation} from "react-i18next";
import LogoutButton from "@/widgets/buttons/LogoutButton.tsx";
import LoginModal from "@/widgets/modals/LoginModal.tsx";
import RegisterModal from "@/widgets/modals/RegisterModal.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/ui/button.tsx";
import Container from "@/layouts/Container.tsx";


export default function IndexTopBar() {

    const user = useAuthStore(state => state.authData?.user);
    const {t} = useTranslation();

    const authContent = (
        <div className="flex gap-3">
            <Button asChild>
                <Link to="/account">{t('menu.account')}</Link>
            </Button>
            <LogoutButton/>
        </div>
    )

    const notAuthContent = (
        <div className="flex items-center gap-3">
            <LoginModal/>
            <RegisterModal/>
        </div>
    )
    return (
        <div className="bg-gray-100 px-4">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div>Money Tracker</div>
                    <div className="flex items-center">
                        {user ? authContent : notAuthContent}
                    </div>
                </div>
            </Container>
        </div>
    )
}