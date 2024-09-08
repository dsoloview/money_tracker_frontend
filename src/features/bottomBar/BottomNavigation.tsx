import {IMobileLink} from "@/models/navigation.model.ts";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/ui/navigation-menu.tsx";
import {Link, useLocation} from "react-router-dom";
import i18next from "@/tools/language/language.ts";
import {ArrowLeftRight, ArrowRightLeft, CreditCard, Send, Settings} from "lucide-react";

const menuItems: IMobileLink[] = [
    {name: i18next.t("menu.settings"), href: "/account/settings", icon: <Settings/>},
    {name: i18next.t("menu.telegram"), href: "/account/telegram", icon: <Send/>},
    {name: i18next.t("menu.account"), href: "/account/accounts", icon: <CreditCard/>},
    {name: i18next.t("menu.transactions"), href: "/account/transactions", icon: <ArrowLeftRight/>},
    {name: i18next.t("menu.transfers"), href: "/account/transfers", icon: <ArrowRightLeft/>},
];
const BottomNavigation = () => {
    const {pathname} = useLocation();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((link) => (
                    <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            asChild
                            active={pathname === link.href}
                        >
                            <Link to={link.href}>
                                {link.icon}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default BottomNavigation;