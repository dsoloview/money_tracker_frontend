import {Select, Spinner} from '@chakra-ui/react'
import {useCurrencies} from "../../api/endpoints/currencies.api.ts";
import {ISelectProps} from "../../models/widget.model.ts";
import {Suspense} from "react";

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

    }: ISelectProps) => {

    return (
        <Suspense fallback={<Spinner/>}>
            <SuspenseCurrencySelect
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

const SuspenseCurrencySelect = (
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
    const {data} = useCurrencies();
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