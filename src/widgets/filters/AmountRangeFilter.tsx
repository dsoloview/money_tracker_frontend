import {TransactionTableFiltersType} from "@/features/transaction/TransactionsTable.tsx";
import {useGetUserTransactionsMinMax} from "@/api/endpoints/user/transaction/userTransaction.api.ts";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import useUserState from "@/hooks/useUserState.ts";
import {useTranslation} from "react-i18next";
import {ITransactionsInfo} from "@/models/transaction.model.ts";
import {Input} from "@/ui/input.tsx";
import {cn} from "@/lib/utils.ts";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    transactionsInfo?: ITransactionsInfo;
    className?: string;
    id?: string;

}
const AmountRangeFilter = (
    {
        filters,
        onFiltersChange,
        className,
        id
    }: Props
) => {
    const {t} = useTranslation();
    const user = useUserState();
    const {data, isLoading} = useGetUserTransactionsMinMax({
        id: user.id,
        filters: filters
    })

    const [minAmount, setMinAmount] = useState<number>(
        filters.amount?.$gte || 0
    );
    const [maxAmount, setMaxAmount] = useState<number>(
        filters.amount?.$lte || 0
    );

    const minDebounced = useDebouncedCallback((value: number) => {
        onFiltersChange("amount", {...filters.amount, $gte: value});
    }, 500)
    const maxDebounced = useDebouncedCallback((value: number) => {
        onFiltersChange("amount", {...filters.amount, $lte: value});
    }, 500);

    useEffect(() => {
        if (data) {
            setMinAmount(filters.amount?.$gte || data.data.min);
            setMaxAmount(filters.amount?.$lte || data.data.max);
        }
    }, [data]);

    const handleMinAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!value) {
            if (data) {
                setMinAmount(data.data.min)
                minDebounced(data.data.min);
            }
        } else {
            setMinAmount(value)
            minDebounced(value);

        }


    }

    const handleMaxAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!value) {
            if (data) {
                setMaxAmount(data.data.max)
                maxDebounced(data.data.max);
            }
        } else {
            setMaxAmount(value)
            maxDebounced(value);
        }

    }

    const containerStyles = cn("flex items-center gap-4", className);
    return (
        <div className={containerStyles} id={id}>
            <Input
                disabled={isLoading}
                value={minAmount}
                onChange={handleMinAmountChange}
                id="transactionTableMinAmountFilter"
                name="minAmount"
                placeholder={t("form.placeholder.minAmount")}
                type="number"
            />
            <Input
                disabled={isLoading}
                value={maxAmount}
                onChange={handleMaxAmountChange}
                id="transactionTableMaxAmountFilter"
                name="maxAmount"
                placeholder={t("form.placeholder.maxAmount")}
                type="number"
            />
        </div>
    )
}

export default AmountRangeFilter;