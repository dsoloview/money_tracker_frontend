import {useTranslation} from "react-i18next";
import {useDisclosure} from "@chakra-ui/react";
import LogoutButton from "@/widgets/buttons/LogoutButton.tsx";
import {ILink} from "@/models/navigation.model.ts";
import {NavLink} from "@/widgets/navigation/NavLink.tsx";
import UserInfo from "@/widgets/user/UserInfo.tsx";
import {Suspense} from "react";
import {Button} from "@/ui/button.tsx";
import {Spinner} from "@/ui/spinner.tsx";
import {Menu, X} from "lucide-react";
import Container from "@/layouts/Container.tsx";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/ui/navigation-menu.tsx";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
const AccountTopBar = () => {
    const {t} = useTranslation();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const menuItems: ILink[] = [
        {name: t("menu.home"), href: "/"},
        {name: t("menu.settings"), href: "/account/settings"},
        {name: t("menu.telegram"), href: "/account/telegram"},
        {name: t("menu.account"), href: "/account"},
        {name: t("menu.transactions"), href: "/account/transactions"},
        {name: t("menu.transfers"), href: "/account/transfers"},
    ];

    return (
        <div className="border border-zinc-400 border-t-0 border-l-0 border-r-0 border-b-1 px-4">
           



            <Container>
                <div className="flex items-center justify-between h-8">
                    <Button
                        className={"md:hidden"}
                        variant="ghost"
                        onClick={isOpen ? onClose : onOpen}
                    >
                        {isOpen ? <X/> : <Menu/>}
                    </Button>
                    <div className="flex justify-center items-center space-x-8">
                        <Link to="/"><img src={logo} alt="money tracker" className="max-h-6"/></Link>
                        <div  className="space-x-4 hidden md:flex">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menuItems.map((link) => (
                                        <Link to={link.href}>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {link.name}
                                            </NavigationMenuLink>
                                        </Link>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>


                       
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
        </div>
    );
};

export default AccountTopBar;
