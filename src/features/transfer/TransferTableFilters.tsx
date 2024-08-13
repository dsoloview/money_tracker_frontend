import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import {TransferTableFiltersType} from "./TransfersTable.tsx";
import {Suspense} from "react";
import {useTranslation} from "react-i18next";
import {Spinner} from "@/ui/spinner.tsx";

type Props = {
    filters: TransferTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

function TransferTableFilters({filters, onFiltersChange}: Props) {
    const {t} = useTranslation();
    return (
        <div className="flex justify-between items-center mb-4 gap-5">
            <Suspense fallback={<Spinner/>}>
                <AccountSelect
                    id="transferTableAccountFromFilter"
                    name="account_from_id"
                    onChange={(accountFromId) => onFiltersChange("account_from_id", accountFromId)}
                    placeholder={t('form.placeholder.accountFrom')}
                    defaultValue={filters?.account_from_id?.$eq}
                />
            </Suspense>
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
    );
}

export default TransferTableFilters;