import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import {TransactionTableFiltersType} from "./TransactionsTable.tsx";
import {Suspense} from "react";
import AmountRangeFilter from "@/widgets/filters/AmountRangeFilter.tsx";
import {useTranslation} from "react-i18next";
import {Spinner} from "@/ui/spinner.tsx";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

function TransactionTableFilters({filters, onFiltersChange}: Props) {
    const {t} = useTranslation();
    return (
        <div className="flex justify-between items-center mb-4 gap-5">
            <Suspense fallback={<Spinner/>}>
                <AccountSelect
                    id="transactionTableAccountFilter"
                    name="account_id"
                    onChange={(accountId) => onFiltersChange("account_id", accountId)}
                    placeholder={t('form.placeholder.account')}
                    defaultValue={filters?.account_id?.$eq}
                />
            </Suspense>
            <CategoryTransactionTypeRadio
                value={filters?.type?.$eq}
                name="type"
                defaultValue={filters?.type?.$eq}
                onChange={(type: string) => onFiltersChange("type", type)}
                haveEmpty
            />
            <Suspense fallback={<Spinner/>}>
                <AmountRangeFilter
                    filters={filters}
                    onFiltersChange={onFiltersChange}
                />
            </Suspense>
        </div>
    );
}

export default TransactionTableFilters;