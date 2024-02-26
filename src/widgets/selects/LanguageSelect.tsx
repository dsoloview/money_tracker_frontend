import { Select } from '@chakra-ui/react'
import {ChangeEvent} from "react";
import {useLanguages} from "../../api/endpoints/languages.api.ts";

type Props = {
    label?: string
    placeholder?: string
    id?: string
    name?: string
    value?: number
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
    required?: boolean
    onBlur?: (e: unknown) => void
    className?: string
}
const LanguageSelect = (
    {
        placeholder,
        id,
        name,
        value,
        onChange,
        hasError,
        required,
        onBlur,
        className
    }: Props) => {
    const {data, isLoading, isError} = useLanguages();

    if (isLoading) {
        return <div>Loading</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <Select
            value={value}
            placeholder={placeholder}
            className={className}
            id={id}
            name={name}
            onChange={onChange}
            isRequired={required}
            isInvalid={hasError}
            onBlur={onBlur}
        >
            <option value={0} disabled>Select language</option>
            {data?.data.map((language) => (
                <option key={language.id} value={language.id}>
                    {language.name} ({language.code})
                </option>
            ))}
        </Select>
    )
}

export default LanguageSelect;