import {ILink} from "@/models/navigation.model.ts";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/ui/navigation-menu.tsx";
import {Link, useLocation} from "react-router-dom";
import i18next from "@/tools/language/language.ts";

const menuItems: ILink[] = [
    {name: i18next.t("menu.settings"), href: "/account/settings"},
    {name: i18next.t("menu.telegram"), href: "/account/telegram"},
    {name: i18next.t("menu.account"), href: "/account"},
    {name: i18next.t("menu.transactions"), href: "/account/transactions"},
    {name: i18next.t("menu.transfers"), href: "/account/transfers"},
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
                                {link.name}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default BottomNavigation;