import {useGetIcons} from "@/api/endpoints/icons.api.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/ui/avatar.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

type Props = {
    id: string,
    name: string,
    onChange: (option: any) => void
    placeholder?: string,
    defaultValue?: string
}

const IconSelect = (
    {
        onChange,
        placeholder,
        defaultValue
    }: Props) => {
    const {data} = useGetIcons();

    let options: { value: string, label: JSX.Element }[] = [];

    if (data) {
        options = data.data.map((icon) => {
            return {
                value: icon.id,
                label: (
                    <Avatar>
                        <AvatarImage src={icon.path} alt={icon.name}/>
                        <AvatarFallback>{icon.name}</AvatarFallback>
                    </Avatar>
                )
            }
        })
    }

    const handleChange = (iconId: string) => {
        onChange(iconId);
        return;
    }

    return (
        <Select value={defaultValue} onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue aria-label={defaultValue}>
                    <div>
                        {options.find((option) => option.value == defaultValue)?.label || placeholder}
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => {
                    return (
                        <SelectItem value={option.value} className="flex items-center justify-center">
                            {option.label}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    );
}

export default IconSelect;
