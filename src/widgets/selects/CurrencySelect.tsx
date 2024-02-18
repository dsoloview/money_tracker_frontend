import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {ChangeEvent} from "react";
import {useCurrencies} from "../../api/endpoints/currencies.api.ts";

type Props = {
    value?: string
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
}
const CurrencySelect = ({value, onChange, hasError, errorMessage}: Props) => {
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
            label="Currencies"
            placeholder="Select currency"
            className="max-w-xs"
            id="currency"
            name="currency"
            defaultSelectedKeys={value}
            onChange={onChange}
            isRequired
            errorMessage={errorMessage}
            isInvalid={hasError}
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