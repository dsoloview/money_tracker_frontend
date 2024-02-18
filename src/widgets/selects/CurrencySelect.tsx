import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {useCurrencies} from "../../api/currencies.api.ts";
import {useState} from "react";

const CurrencySelect = () => {
    const [selectedCurrency, setSelectedCurrency] = useState("3");
    const currencies = useCurrencies();

    if (currencies.isLoading) {
        return <Spinner />
    }
    return (
        <Select
            items={currencies?.data?.data}
            label="Currencies"
            placeholder="Select currency"
            className="max-w-xs"
            id="currency"
            name="currency"
            value={selectedCurrency}
            selectedKeys={[selectedCurrency]}
            onChange={(event) => setSelectedCurrency(event.target.value)}
        >
            {(currency) =>
                <SelectItem
                    key={currency.id}
                    value={currency.id}>
                    {`${currency.name} - ${currency.symbol} - ${currency.code}`}
                </SelectItem>
            }
        </Select>
    )
}

export default CurrencySelect;