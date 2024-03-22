import {Flex, FormControl, FormLabel, Spinner} from "@chakra-ui/react";
import AccountSelect from "../../widgets/selects/AccountSelect.tsx";
import {TransferTableFiltersType} from "./TransfersTable.tsx";
import {Suspense} from "react";
import {useTranslation} from "react-i18next";

type Props = {
    filters: TransferTableFiltersType;
    onFiltersChange: (key: string, value: any) => void;
    resetFilters?: () => void;
    isLoading: boolean;
}

function TransferTableFilters({filters, onFiltersChange}: Props) {
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
                           htmlFor="transferTableAccountFromFilter">{t('form.label.accountFrom')}</FormLabel>
                <Suspense fallback={<Spinner/>}>
                    <AccountSelect
                        id="transferTableAccountFromFilter"
                        name="account_from_id"
                        onChange={(accountFromId: number) => onFiltersChange("account_from_id", accountFromId)}
                        placeholder={t('form.placeholder.accountFrom')}
                        defaultValue={filters?.account_from_id?.$eq}
                    />
                </Suspense>
            </FormControl>
            <FormControl
                className="max-w-xl"
            >
                <FormLabel textAlign="center"
                           htmlFor="transferTableAccountToFilter">{t('form.label.accountTo')}</FormLabel>
                <Suspense fallback={<Spinner/>}>
                    <AccountSelect
                        id="transferTableAccountToFilter"
                        name="account_to_id"
                        onChange={(accountToId: number) => onFiltersChange("account_to_id", accountToId)}
                        placeholder={t('form.placeholder.accountTo')}
                        defaultValue={filters?.account_to_id?.$eq}
                    />
                </Suspense>
            </FormControl>
        </Flex>
    );
}

export default TransferTableFilters;