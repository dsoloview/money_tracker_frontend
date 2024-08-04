import {Select} from "chakra-react-select";
import {useGetIcons} from "@/api/endpoints/icons.api.ts";
import {Avatar} from "@/ui/avatar.tsx";

type Props = {
    id: string,
    name: string,
    onBlur?: (e: unknown) => void
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void
    onChange?: (option: any) => void
    placeholder?: string,
    defaultValue?: number

}
const IconSelect = (
    {
        onBlur,
        setFieldValue,
        id,
        name,
        onChange,
        placeholder,
        defaultValue
    }: Props) => {
    const {data, isLoading} = useGetIcons();

    let options: { value: number, filterValue: string, label: JSX.Element }[] = [];

    if (data) {
        options = data.data.map((icon) => {
            return {
                value: icon.id,
                filterValue: icon.name,
                label: (
                    <div className="flex items-center justify-center">
                        <Avatar
                            bg="transparent"
                            borderColor="gray.300"
                            color="black"
                            size={"md"}
                            name={icon.name}
                            src={icon.path}
                        />
                    </div>
                )
            };
        });
    }

    const handleChange = (option: any) => {
        if (setFieldValue) {
            setFieldValue(name, option?.value);
            return;
        }

        if (onChange) {
            onChange(option?.value);
            return;
        }
    }

    return (
        <Select
            isLoading={isLoading}
            id={id}
            name={name}
            options={options}
            onBlur={onBlur}
            onChange={handleChange}
            isClearable={true}
            placeholder={placeholder}
            defaultValue={options.find((option) => option.value == defaultValue)}
        />
    );
}

export default IconSelect;
