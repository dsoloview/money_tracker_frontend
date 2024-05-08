import {useCurrencies} from "@/api/endpoints/currencies.api.ts";
import {ISelectProps} from "@/models/widget.model.ts";
import {Suspense} from "react";
import {Spinner} from "@/ui/spinner.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

const CurrencySelect = (
    {
        onChange,
        value

    }: ISelectProps) => {

    return (
        <Suspense fallback={<Spinner/>}>
            <SuspenseCurrencySelect
                value={value}
                onChange={onChange}
            />
        </Suspense>

    )
}

const SuspenseCurrencySelect = (
    {
        onChange,
        value

    }: ISelectProps) => {
    const {data} = useCurrencies();
    return (
        <Select onValueChange={onChange} defaultValue={value.toString()}>
            <SelectTrigger>
                <SelectValue placeholder="Select language"/>
            </SelectTrigger>
            <SelectContent>
                {data?.data.map((currency) => (
                    <SelectItem key={currency.id} value={currency.id.toString()}>
                        {currency.name} ({currency.code})
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CurrencySelect;