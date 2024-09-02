import useAuthStore from "@/stores/authStore.ts";
import {useTranslation} from "react-i18next";
import LogoutButton from "@/widgets/buttons/LogoutButton.tsx";
import LoginModal from "@/widgets/modals/LoginModal.tsx";
import RegisterModal from "@/widgets/modals/RegisterModal.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/ui/button.tsx";
import Container from "@/layouts/Container.tsx";
import logo from "@/assets/logo.svg";

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
        <div className="border border-zinc-400 border-t-0 border-l-0 border-r-0 border-b-1 px-4">
            <Container>
                <div className="flex h-8 items-center justify-between">
                    <Link to="/"><img src={logo} alt="money tracker" className="max-h-6"/></Link>
                    
                    <div className="flex items-center">
                        {user ? authContent : notAuthContent}
                    </div>
                </div>
            </Container>
        </div>
    )
}