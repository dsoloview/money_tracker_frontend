import {ChangeEvent} from "react";
import { Select } from '@chakra-ui/react'
import {useCurrencies} from "../../api/endpoints/currencies.api.ts";

type Props = {
    label?: string
    placeholder?: string
    id?: string
    name?: string
    value: number
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
    required?: boolean
    onBlur?: (e: unknown) => void
    className?: string
}
const CurrencySelect = (
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

    }: Props) => {
    const {data, isLoading, isError} = useCurrencies();

    if (isLoading) {
        return "Loading"
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
            <option value={0} disabled>Select currency</option>
            {data?.data.map((currency) => (
                <option key={currency.id} value={currency.id}>
                    {currency.name} ({currency.code})
                </option>
            ))}
        </Select>
    )
}

export default CurrencySelect;