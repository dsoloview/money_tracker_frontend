import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/ui/sheet.tsx";
import {Button} from "@/ui/button.tsx";
import {FilterIcon} from "lucide-react";
import {Spinner} from "@/ui/spinner.tsx";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import {Label} from "@/ui/label.tsx";
import {TransferTableFiltersType} from "@/features/transfer/TransfersTable.tsx";

type Props = {
    filters: TransferTableFiltersType;
    onFiltersChange: (key: keyof TransferTableFiltersType, value: TransferTableFiltersType[keyof TransferTableFiltersType] | string) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

const MobileTransfersFilters = ({filters, onFiltersChange, resetFilters}: Props) => {
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
                    <Label htmlFor="transferTableAccountFromFilter">{t('form.label.accountFrom')}</Label>
                    <Suspense fallback={<Spinner/>}>
                        <AccountSelect
                            id="transferTableAccountFromFilter"
                            name="account_from_id"
                            onChange={(accountFromId) => onFiltersChange("account_from_id", accountFromId)}
                            placeholder={t('form.placeholder.accountFrom')}
                            defaultValue={filters?.account_from_id?.$eq}
                        />
                    </Suspense>
                </div>
                <div>
                    <Label htmlFor="transferTableAccountToFilter">{t('form.label.accountTo')}</Label>
                    <Suspense fallback={<Spinner/>}>
                        <AccountSelect
                            id="transferTableAccountToFilter"
                            name="account_to_id"
                            onChange={(accountToId) => onFiltersChange("account_to_id", accountToId)}
                            placeholder={t('form.placeholder.accountTo')}
                            defaultValue={filters?.account_to_id?.$eq}
                        />
                    </Suspense>
                </div>
                <Button variant="outline" onClick={resetFilters}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-2">
                    {t('button.reset')}
                </Button>
            </SheetContent>
        </Sheet>
    );
}

export default MobileTransfersFilters;