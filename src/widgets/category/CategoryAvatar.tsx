import {Avatar, AvatarFallback, AvatarImage} from "@/ui/avatar.tsx";

type Props = {
    name: string;
    icon?: string;
    showBorder?: boolean;
};
const CategoryAvatar = ({name, icon}: Props) => {
    return (
        <Avatar>
            <AvatarImage src={icon} alt={name}/>
            <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
    )
}

export default CategoryAvatar;