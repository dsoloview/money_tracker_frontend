import {Avatar} from "@chakra-ui/react";
import {ICategory} from "../../models/category.model.ts";

type Props = {
    category: ICategory;
    showBorder?: boolean;
};
const CategoryAvatar = ({category, showBorder = false}: Props) => {
    return (
        <Avatar
            bg="transparent"
            showBorder={showBorder}
            borderColor="gray.300"
            color="black"
            name={category.name}
            src={category.icon}
        />
    )
}

export default CategoryAvatar;