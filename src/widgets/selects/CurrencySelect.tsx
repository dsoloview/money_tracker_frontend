import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {ChangeEvent} from "react";
import {useCurrencies} from "../../api/endpoints/currencies.api.ts";

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
}
const CurrencySelect = (
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
        onBlur

    }: Props) => {
    const {data, isLoading, isError} = useCurrencies();

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
            className="max-w-xs"
            id={id}
            name={name}
            defaultSelectedKeys={value}
            onChange={onChange}
            isRequired={required}
            errorMessage={errorMessage}
            isInvalid={hasError}
            onBlur={onBlur}
        >
            {(currency) =>
                <SelectItem
                    key={currency.id}
                    value={currency.id}

                >
                    {`${currency.name} - ${currency.symbol}`}
                </SelectItem>
            }
        </Select>
    )
}

export default CurrencySelect;