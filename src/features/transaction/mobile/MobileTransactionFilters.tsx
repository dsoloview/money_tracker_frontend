import {TransactionTableFiltersType} from "@/features/transaction/TransactionsTable.tsx";
import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/ui/sheet.tsx";
import {Button} from "@/ui/button.tsx";
import {FilterIcon} from "lucide-react";
import {Spinner} from "@/ui/spinner.tsx";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import AmountRangeFilter from "@/widgets/filters/AmountRangeFilter.tsx";
import {Label} from "@/ui/label.tsx";
import {DatePickerWithRange} from "@/widgets/date/DateRangePicker.tsx";
import CategoryFilterSelect from "@/widgets/selects/CategoryFilterSelect.tsx";

type Props = {
    filters: TransactionTableFiltersType;
    onFiltersChange: (key: keyof TransactionTableFiltersType, value: TransactionTableFiltersType[keyof TransactionTableFiltersType] | string) => void;
    resetFilters?: () => void;
    isLoading: boolean;
};
const MobileTransactionFilters = ({filters, onFiltersChange, resetFilters}: Props) => {
    const {t} = useTranslation();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center rounded-md px-3 py-2 shadow-sm">
                    <FilterIcon className="mr-2"/> {t('form.label.filters')}
                </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4 space-y-6 w-full bg-white shadow-md rounded-lg">
                <SheetHeader>
                    <SheetTitle>{t('form.label.filters')}</SheetTitle>
                </SheetHeader>
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

                <div className="mx-auto">
                    <Label htmlFor="categoryTransactionTypeRadioFilter">{t('form.label.type')}</Label>
                    <Suspense fallback={<Spinner/>}>
                        <CategoryTransactionTypeRadio
                            id={"categoryTransactionTypeRadioFilter"}
                            name="type"
                            defaultValue={filters?.type?.$eq}
                            onChange={(type: string) => onFiltersChange("type", type)}
                            haveEmpty
                            className="mt-3"
                        />
                    </Suspense>
                </div>

                <div>
                    <Label htmlFor="amountRangeFilter">{t('form.label.amount')}</Label>
                    <Suspense fallback={<Spinner/>}>
                        <AmountRangeFilter
                            id={"amountRangeFilter"}
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                            className="mt-3"
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

                <Button variant="outline" onClick={resetFilters}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-2">
                    {t('button.reset')}
                </Button>
            </SheetContent>
        </Sheet>
    );
}

export default MobileTransactionFilters;