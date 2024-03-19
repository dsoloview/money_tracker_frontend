import {TransactionTableFiltersType} from "../../features/transaction/TransactionsTable.tsx";
import {Flex, Input, InputGroup, InputRightElement, Spinner} from "@chakra-ui/react";
import {useGetUserTransactionsMinMax} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import useUserState from "../../hooks/useUserState.ts";
import {useTranslation} from "react-i18next";
import {ITransactionsInfo} from "../../models/transaction.model.ts";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    transactionsInfo?: ITransactionsInfo;

}
const AmountRangeFilter = (
    {
        filters,
        onFiltersChange,
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
            console.log(data.data.min, data.data.max)
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

    return (
        <Flex
            alignItems="center"
            gap={4}
        >
            <InputGroup
                w={40}
            >
                <Input
                    disabled={isLoading}
                    value={minAmount}
                    onChange={handleMinAmountChange}
                    id="transactionTableMinAmountFilter"
                    name="minAmount"
                    placeholder={t("form.placeholder.minAmount")}
                    type="number"
                />
                {isLoading && <InputRightElement><Spinner/></InputRightElement>}
            </InputGroup>
            <InputGroup
                w={40}
            >
                <Input
                    disabled={isLoading}
                    value={maxAmount}
                    onChange={handleMaxAmountChange}
                    id="transactionTableMaxAmountFilter"
                    name="maxAmount"
                    placeholder={t("form.placeholder.maxAmount")}
                    type="number"
                />
                {isLoading && <InputRightElement><Spinner/></InputRightElement>}
            </InputGroup>

        </Flex>
    )
}

export default AmountRangeFilter;