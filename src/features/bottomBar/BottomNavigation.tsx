import {ILink} from "@/models/navigation.model.ts";
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/ui/navigation-menu.tsx";
import {Link, useLocation} from "react-router-dom";
import i18next from "@/tools/language/language.ts";
import {cn} from "@/lib/utils.ts";

const menuItems: ILink[] = [
    {name: i18next.t("menu.settings"), href: "/account/settings"},
    {name: i18next.t("menu.telegram"), href: "/account/telegram"},
    {name: i18next.t("menu.account"), href: "/account"},
    {name: i18next.t("menu.transactions"), href: "/account/transactions"},
    {name: i18next.t("menu.transfers"), href: "/account/transfers"},
];
const BottomNavigation = () => {
    const {pathname} = useLocation();
    const styles = cn(
        navigationMenuTriggerStyle(),
        'px-1'
    )

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((link) => (
                    <Link to={link.href} key={link.href}>
                        <NavigationMenuLink
                            className={styles}
                            active={pathname === link.href}
                        >
                            {link.name}
                        </NavigationMenuLink>
                    </Link>

                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default BottomNavigation;