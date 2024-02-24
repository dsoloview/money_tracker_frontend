import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    NavbarItem,
    NavbarMenu, NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import {useState} from "react";
import {Link as RouterLink} from "@tanstack/react-router";
import LogoutButton from "../../widgets/buttons/LogoutButton.tsx";
import useAuthStore from "../../stores/authStore.ts";
import {useTranslation} from "react-i18next";

const AccountTopBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentPage = window.location.pathname;
    const user = useAuthStore(state => state.authData?.user);
    const {t} = useTranslation();

    const menuItems = [
        {name: t('menu.home'), href: "/"},
        {name: t('menu.settings'), href: "/account/settings"},
        {name: t('menu.account'), href: "/account"},
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    Money Tracker
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    menuItems.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Link as={RouterLink} to={item.href} color={item.href === currentPage ? "primary" : "foreground"}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {user && (
                    <NavbarItem className="hidden lg:flex">
                        <Link as={RouterLink} to="/account" color="foreground">
                            {user.email}
                        </Link>
                    </NavbarItem>

                )}
                <NavbarItem className="hidden lg:flex">
                    <LogoutButton />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link as={RouterLink} to={item.href} color={item.href === currentPage ? "primary" : "foreground"}>
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default AccountTopBar;