import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import {TransactionTableFiltersType} from "./TransactionsTable.tsx";
import {Suspense} from "react";
import AmountRangeFilter from "@/widgets/filters/AmountRangeFilter.tsx";
import {useTranslation} from "react-i18next";
import {Spinner} from "@/ui/spinner.tsx";
import {Label} from "@/ui/label.tsx";
import {DatePickerWithRange} from "@/widgets/date/DateRangePicker.tsx";
import CategoryFilterSelect from "@/widgets/selects/CategoryFilterSelect.tsx";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: keyof TransactionTableFiltersType, value: TransactionTableFiltersType[keyof TransactionTableFiltersType] | string) => void;
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
                <DatePickerWithRange dateRange={{
                    from: filters.date?.$gte,
                    to: filters.date?.$lte
                }}
                                     onChange={(date) => onFiltersChange("date", {
                                         $gte: date?.from,
                                         $lte: date?.to
                                     })}
                />
            </div>
            <div>
                <Label>{t('form.label.categories')}</Label>
                <CategoryFilterSelect
                    onChange={(categoryIds) => onFiltersChange("categories", {id: {$in: categoryIds}})}
                    values={filters.categories?.id?.$in || []}
                />
            </div>
        </div>
    );
}

export default TransactionTableFilters;