import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import {TransactionTableFiltersType} from "./TransactionsTable.tsx";
import {Suspense} from "react";
import AmountRangeFilter from "@/widgets/filters/AmountRangeFilter.tsx";
import {useTranslation} from "react-i18next";
import {Spinner} from "@/ui/spinner.tsx";
import {Label} from "@/ui/label.tsx";
import {DatePickerWithRange} from "@/widgets/selects/DateRangePicker.tsx";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

function TransactionTableFilters({filters, onFiltersChange}: Props) {
    const {t} = useTranslation();
    return (
        <div className="w-full flex flex-col gap-3 justify-start">
            <div>
                <Label htmlFor="transactionTableAccountFilter">{t('form.label.account')}</Label>
                <Suspense fallback={<Spinner/>}>
                    <AccountSelect
                        id="transactionTableAccountFilter"
                        name="account_id"
                        onChange={(accountId) => onFiltersChange("account_id", accountId)}
                        placeholder={t('form.placeholder.account')}
                        defaultValue={filters?.account_id?.$eq}
                    />
                </Suspense>
            </div>
            <div>
                <Label htmlFor="transactionTableTypeFilter">{t('form.label.type')}</Label>
                <CategoryTransactionTypeRadio
                    id="transactionTableTypeFilter"
                    name="type"
                    onChange={(type) => onFiltersChange("type", type)}
                    defaultValue={filters?.type?.$eq}
                />
            </div>
            <div>
                <Label htmlFor="transactionTableAmountFilter">{t('form.label.amount')}</Label>
                <Suspense fallback={<Spinner/>}>
                    <AmountRangeFilter
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                    />
                </Suspense>
            </div>
            <div>
                <Label htmlFor="transactionTableDateFilter">{t('form.label.date')}</Label>
                <DatePickerWithRange/>
            </div>
        </div>
    );
}

export default TransactionTableFilters;