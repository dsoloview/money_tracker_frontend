import {Link} from "@chakra-ui/react";
import {Link as RouterLink} from "@tanstack/react-router";
import {ILink} from "../../models/navigation.model.ts";

type Props = {
    link: ILink
}

export const NavLink = ({link}: Props) => {
    const currentPage = window.location.pathname;
    return (
        <Link
            color={currentPage === link.href ? 'blue.500' : 'gray.500'}
            as={RouterLink}
            key={link.href}
            to={link.href}>
            {link.name}
        </Link>
    )
}