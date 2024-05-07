import {ILink} from "@/models/navigation.model.ts";
import {Link} from "react-router-dom";

type Props = {
    link: ILink
}

export const NavLink = ({link}: Props) => {
    const currentPage = window.location.pathname;
    return (
        <Link
            color={currentPage === link.href ? 'blue.500' : 'gray.500'}
            state={{prevPath: currentPage}}
            key={link.href}
            to={link.href}>
            {link.name}
        </Link>
    )
}