import {useTranslation} from "react-i18next";
import LogoutButton from "@/widgets/buttons/LogoutButton.tsx";
import {ILink} from "@/models/navigation.model.ts";
import {NavLink} from "@/widgets/navigation/NavLink.tsx";
import UserInfo from "@/widgets/user/UserInfo.tsx";
import {Suspense, useState} from "react";
import {Button} from "@/ui/button.tsx";
import {Spinner} from "@/ui/spinner.tsx";
import {Menu, X} from "lucide-react";
import Container from "@/layouts/Container.tsx";

const AccountTopBar = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen((state) => !state);
    }

    const menuItems: ILink[] = [
        {name: t("menu.home"), href: "/"},
        {name: t("menu.settings"), href: "/account/settings"},
        {name: t("menu.telegram"), href: "/account/telegram"},
        {name: t("menu.account"), href: "/account"},
        {name: t("menu.transactions"), href: "/account/transactions"},
        {name: t("menu.transfers"), href: "/account/transfers"},
    ];

    return (
        <header className="bg-gray-100">
            <Container>
                <div className="flex items-center justify-between h-[64px]">
                    <Button
                        className={"md:hidden"}
                        variant="ghost"
                        onClick={handleOpen}
                    >
                        {isOpen ? <X/> : <Menu/>}
                    </Button>
                    <div className="flex justify-center items-center space-x-8">
                        <div>Money Tracker</div>
                        <nav className="space-x-4 hidden md:flex">
                            {menuItems.map((link) => (
                                <NavLink link={link} key={link.href}/>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <Suspense fallback={<Spinner/>}>
                            <UserInfo/>
                        </Suspense>
                        <LogoutButton/>
                    </div>
                </div>

                {isOpen ? (
                    <div className="pb-4 md:hidden">
                        <nav className="flex flex-col space-y-4">
                            {menuItems.map((link) => (
                                <NavLink link={link} key={link.href}/>
                            ))}
                        </nav>
                    </div>
                ) : null}
            </Container>
        </header>
    );
};

export default AccountTopBar;
