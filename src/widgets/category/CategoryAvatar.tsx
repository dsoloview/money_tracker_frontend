import {Avatar} from "@chakra-ui/react";

type Props = {
    name: string;
    icon?: string;
    showBorder?: boolean;
};
const CategoryAvatar = ({name, icon, showBorder = false}: Props) => {
    return (
        <Avatar
            bg="transparent"
            showBorder={showBorder}
            borderColor="gray.300"
            color="black"
            size={"md"}
            name={name}
            src={icon}
        />
    )
}

export default CategoryAvatar;