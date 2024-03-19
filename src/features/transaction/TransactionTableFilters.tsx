import {Flex, FormControl, FormLabel, Spinner} from "@chakra-ui/react";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "../../widgets/radio/CategoryTransactionTypeRadio.tsx";
import {TransactionTableFiltersType} from "./TransactionsTable.tsx";
import {Suspense} from "react";
import AmountRangeFilter from "../../widgets/filters/AmountRangeFilter.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

function TransactionTableFilters({filters, onFiltersChange}: Props) {
    const {t} = useTranslation();
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            mb={4}
        >
            <FormControl
                className="max-w-xl"
            >
                <FormLabel textAlign="center"
                           htmlFor="transactionTableAccountFilter">{t('form.label.account')}</FormLabel>
                <Suspense fallback={<Spinner/>}>
                    <AccountSelect
                        id="transactionTableAccountFilter"
                        name="account_id"
                        onChange={(accountId: number) => onFiltersChange("account_id", accountId)}
                        placeholder={t('form.placeholder.account')}
                        defaultValue={filters?.account_id?.$eq}
                    />
                </Suspense>
            </FormControl>
            <FormControl
                className="max-w-xl"
            >
                <FormLabel textAlign="center" htmlFor="transactionTableAccountFilter">{t('form.label.type')}</FormLabel>
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
                <FormLabel textAlign="center"
                           htmlFor="transactionTableAccountFilter">{t('form.label.amount')}</FormLabel>
                <Suspense fallback={<Spinner/>}>
                    <AmountRangeFilter
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                    />
                </Suspense>
            </FormControl>
        </Flex>
    );
}

export default TransactionTableFilters;