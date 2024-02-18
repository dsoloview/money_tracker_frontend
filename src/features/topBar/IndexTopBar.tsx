import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, useDisclosure,
} from "@nextui-org/react";
import LoginModal from "../../widgets/modals/LoginModal.tsx";
import SignupModal from "../../widgets/modals/SignupModal.tsx";

const IndexTopBar = () => {
    const {isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onOpenChange: onOpenChangeLoginModal} = useDisclosure()
    const {isOpen: isOpenSignupModal, onOpen: onOpenSignupModal, onOpenChange: onOpenChangeSignupModal} = useDisclosure()

    return (
        <Navbar>
            <NavbarContent>
                <NavbarBrand>
                    Money Tracker
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button color="primary" variant="flat" onPress={onOpenLoginModal}>Login</Button>
                    <LoginModal
                        isOpen={isOpenLoginModal}
                        onOpenChange={onOpenChangeLoginModal}
                    />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Button onPress={onOpenSignupModal} color="primary" href="#" variant="flat">Signup</Button>
                    <SignupModal isOpen={isOpenSignupModal} onOpenChange={onOpenChangeSignupModal} />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default IndexTopBar;