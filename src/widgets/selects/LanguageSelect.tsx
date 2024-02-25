import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {ChangeEvent} from "react";
import {useLanguages} from "../../api/endpoints/languages.api.ts";

type Props = {
    label?: string
    placeholder?: string
    id?: string
    name?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
    required?: boolean
    onBlur?: (e: unknown) => void
    className?: string
}
const LanguageSelect = (
    {
        label,
        placeholder,
        id,
        name,
        value,
        onChange,
        hasError,
        errorMessage,
        required,
        onBlur,
        className
    }: Props) => {
    const {data, isLoading, isError} = useLanguages();

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <Select
            items={data?.data}
            label={label}
            placeholder={placeholder}
            className={className}
            id={id}
            name={name}
            selectionMode="single"
            selectedKeys={value}
            defaultSelectedKeys={value}
            onChange={onChange}
            isRequired={required}
            errorMessage={errorMessage}
            isInvalid={hasError}
            onBlur={onBlur}
        >
            {(language) =>
                <SelectItem
                    key={language.id}
                    value={language.id}

                >
                    {`${language.name} - ${language.code}`}
                </SelectItem>
            }
        </Select>
    )
}

export default LanguageSelect;