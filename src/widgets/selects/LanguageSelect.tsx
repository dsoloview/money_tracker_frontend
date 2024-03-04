import {Select, Spinner} from '@chakra-ui/react'
import {ISelectProps} from "../../models/widget.model.ts";
import {Suspense} from "react";
import {useLanguages} from "../../api/endpoints/languages.api.ts";

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
    }: ISelectProps) => {

    return (
        <Suspense fallback={<Spinner/>}>
            <SuspenseLanguageSelect
                value={value}
                placeholder={placeholder}
                className={className}
                id={id}
                name={name}
                onChange={onChange}
                required={required}
                hasError={hasError}
                onBlur={onBlur}
            />
        </Suspense>
    )
}

const SuspenseLanguageSelect = (
    {
        placeholder,
        id,
        name,
        onChange,
        hasError,
        required,
        onBlur,
        className,
        value

    }: ISelectProps) => {
    const {data} = useLanguages();
    
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