import {TransactionTableFiltersType} from "../../features/transaction/TransactionsTable.tsx";
import {Flex, Input} from "@chakra-ui/react";
import {useGetUserTransactionsMinMax} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import useUserState from "../../hooks/useUserState.ts";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;

}
const AmountRangeFilter = (
    {
        filters,
        onFiltersChange,
    }: Props
) => {
    const user = useUserState();
    const {data} = useGetUserTransactionsMinMax({
        id: user.id,
        filters: filters
    })
    const [minAmount, setMinAmount] = useState<number>(
        filters.amount?.$gte || data.data.min
    );
    const [maxAmount, setMaxAmount] = useState<number>(
        filters.amount?.$lte || data.data.max
    );

    const minDebounced = useDebouncedCallback((value: number) => {
        onFiltersChange("amount", {...filters.amount, $gte: value});
    }, 500)
    const maxDebounced = useDebouncedCallback((value: number) => {
        onFiltersChange("amount", {...filters.amount, $lte: value});
    }, 500);

    useEffect(() => {
        setMinAmount(filters.amount?.$gte || data.data.min);
        setMaxAmount(filters.amount?.$lte || data.data.max);
    }, [data]);

    const handleMinAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!value) {
            setMinAmount(data.data.min)
        } else {
            setMinAmount(value)
        }

        minDebounced(value);
    }

    const handleMaxAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!value) {
            setMaxAmount(data.data.max)
        } else {
            setMaxAmount(value)
        }

        maxDebounced(value);
    }

    return (
        <Flex
            alignItems="center"
            gap={4}
        >
            <Input
                value={minAmount}
                onChange={handleMinAmountChange}
                id="transactionTableMinAmountFilter"
                name="minAmount"
                placeholder="Min amount"
                type="number"
                w={40}
            />
            <Input
                value={maxAmount}
                onChange={handleMaxAmountChange}
                id="transactionTableMaxAmountFilter"
                name="maxAmount"
                placeholder="Max amount"
                type="number"
                w={40}
            />
        </Flex>
    )
}

export default AmountRangeFilter;