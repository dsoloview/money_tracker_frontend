import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, useDisclosure,
} from "@nextui-org/react";
import LoginModal from "../../widgets/modals/LoginModal.tsx";
import SignupModal from "../../widgets/modals/SignupModal.tsx";
import useAuthStore from "../../stores/authStore.ts";
import LogoutButton from "../../widgets/buttons/LogoutButton.tsx";
import { Link } from "@tanstack/react-router";
import {useTranslation} from "react-i18next";

const IndexTopBar = () => {
    const user = useAuthStore(state => state.authData?.user);
    const {isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onOpenChange: onOpenChangeLoginModal} = useDisclosure()
    const {isOpen: isOpenSignupModal, onOpen: onOpenSignupModal, onOpenChange: onOpenChangeSignupModal} = useDisclosure()
    const {t} = useTranslation();

    const authContent = (
        <>
            <NavbarItem className="hidden lg:flex">
                <Button as={Link} to="/account" color="primary" variant="flat">{t('menu.account')}</Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
                <LogoutButton />
            </NavbarItem>
        </>
    )

    const notAuthContent = (
        <>
            <NavbarItem className="hidden lg:flex">
                <Button color="primary" variant="flat" onPress={onOpenLoginModal}>{t('auth.login')}</Button>
                <LoginModal
                    isOpen={isOpenLoginModal}
                    onOpenChange={onOpenChangeLoginModal}
                />
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
                <Button onPress={onOpenSignupModal} color="primary" href="#" variant="flat">{t('auth.register')}</Button>
                <SignupModal isOpen={isOpenSignupModal} onOpenChange={onOpenChangeSignupModal} />
            </NavbarItem>
        </>
    );


    return (
        <Navbar>
            <NavbarContent>
                <NavbarBrand>
                    Money Tracker
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
                {user ? authContent : notAuthContent}
            </NavbarContent>
        </Navbar>
    )
}

export default IndexTopBar;