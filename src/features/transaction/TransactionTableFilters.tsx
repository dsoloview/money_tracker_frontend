import {Box, FormControl, FormLabel, Spinner} from "@chakra-ui/react";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "../../widgets/radio/CategoryTransactionTypeRadio.tsx";
import {TransactionTableFiltersType} from "./TransactionsTable.tsx";
import {Suspense} from "react";
import AmountRangeSlider from "../../widgets/range/AmountRangeSlider.tsx";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    minAmount: number;
    maxAmount: number;
}

function TransactionTableFilters({filters, onFiltersChange, minAmount, maxAmount}: Props) {

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
        >
            <FormControl
                className="max-w-xl"
            >
                <FormLabel htmlFor="transactionTableAccountFilter">Account</FormLabel>
                <Suspense fallback={<Spinner/>}>
                    <AccountSelect
                        id="transactionTableAccountFilter"
                        name="account_id"
                        onChange={(accountId: number) => onFiltersChange("account_id", accountId)}
                        placeholder="Select account"
                        defaultValue={filters?.account_id?.$eq}
                    />
                </Suspense>
            </FormControl>
            <FormControl
                className="max-w-xl"
            >
                <FormLabel htmlFor="transactionTableAccountFilter">Type</FormLabel>
                <CategoryTransactionTypeRadio
                    value={filters?.type?.$eq}
                    name="type"
                    defaultValue={filters?.type?.$eq}
                    onChange={(type: string) => onFiltersChange("type", type)}
                    haveEmpty
                />
            </FormControl>
            <FormControl
                className="max-w-xl"
            >
                <FormLabel htmlFor="transactionTableAccountFilter">Amount</FormLabel>
                <AmountRangeSlider
                    onChange={(values: number[]) => onFiltersChange("amount", {$gte: values[0], $lte: values[1]})}
                    minRangeValue={minAmount}
                    maxRangeValue={maxAmount}
                    minAmount={filters?.amount?.$gte || minAmount}
                    maxAmount={filters?.amount?.$lte || maxAmount}
                />
            </FormControl>
        </Box>
    );
}

export default TransactionTableFilters;