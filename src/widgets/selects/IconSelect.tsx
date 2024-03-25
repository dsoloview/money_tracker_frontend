import {Select} from "chakra-react-select";
import {Avatar, Flex} from "@chakra-ui/react";
import {useGetIcons} from "../../api/endpoints/icons.api.ts";

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

    let options: { value: string, filterValue: string, label: JSX.Element }[] = [];

    if (data) {
        options = data.data.map((icon) => {
            return {
                value: icon.id,
                filterValue: icon.name,
                label: (
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar
                            bg="transparent"
                            borderColor="gray.300"
                            color="black"
                            size={"md"}
                            name={icon.name}
                            src={icon.path}
                        />
                    </Flex>
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
            // className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            // styles={{
            //     menu: base => ({...base, zIndex: 9999}),
            //     option: base => ({
            //         ...base,
            //         height: "50px",
            //         display: "flex",
            //         alignItems: "center"
            //     })
            // }}
        />
    );
}

export default IconSelect;
