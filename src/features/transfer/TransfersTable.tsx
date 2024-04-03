import {DataTable} from "../../widgets/table/DataTable.tsx";
import {IParamTableGetRequest} from "../../models/request.model.ts";
import usePagination from "../../hooks/usePagination.ts";
import {useSorting} from "../../hooks/useSort.ts";
import {Badge} from "@chakra-ui/react";
import {formatDateTimeString} from "../../tools/date/date.helper.ts";
import useFilters from "../../hooks/useFilters.ts";
import useUserState from "../../hooks/useUserState.ts";
import i18next from "../../tools/language/language.ts";
import {ITransfer} from "../../models/transfer.model.ts";
import {useGetUserTransfers} from "../../api/endpoints/user/transfer/userTransaction.api.ts";
import TransferTableFilters from "./TransferTableFilters.tsx";

const columns = [
    {
        header: i18next.t('form.label.accountFrom'),
        accessor: 'account_from.name',
        cell: (row: ITransfer) => {
            return row.account_from.name;
        },
        enableSorting: false,
    },
    {
        header: i18next.t('form.label.accountTo'),
        accessor: 'account_to.name',
        cell: (row: ITransfer) => {
            return row.account_to.name;
        },
        enableSorting: false,
    },
    {
        header: i18next.t('form.label.amountFrom'),
        accessor: 'amount_from',
        cell(row: ITransfer) {
            return (
                <Badge colorScheme="red">
                    {row.amount_from} {row.account_from.currency.symbol}
                </Badge>
            )
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.amountTo'),
        accessor: 'amount_to',
        cell(row: ITransfer) {
            return (
                <Badge colorScheme="green">
                    {row.amount_to} {row.account_to.currency.symbol}
                </Badge>
            )
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.date'),
        accessor: 'date',
        cell: (row: ITransfer) => {
            return formatDateTimeString(row.date);
        },
        enableSorting: true,
    },
];

export type TransferTableFiltersType = {
    account_from_id?: {
        '$eq'?: number;
    };
    account_to_id?: {
        '$eq'?: number;
    };
}

const TransfersTable = () => {
    const {pagination, onPaginationChange, resetPagination} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting("date", "desc");
    const {filters, onFilterChange, resetFilters} = useFilters<TransferTableFiltersType>({
        onFiltersChange: resetPagination
    });

    const user = useUserState();

    const {data, isLoading} = useGetUserTransfers({
        id: user.id,
        page: pagination.pageIndex + 1,
        sort: field,
        direction: order,
        filters: filters
    } as IParamTableGetRequest);

    return (
        <>
            <TransferTableFilters
                filters={filters}
                onFiltersChange={onFilterChange}
                resetFilters={resetFilters}
                isLoading={isLoading}
            />
            <DataTable<ITransfer>
                data={data?.data || []}
                columns={columns}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                pageCount={data?.meta.last_page || 0}
                sort={sort}
                onSortingChange={onSortingChange}
                isLoading={isLoading}
            />
        </>
    )
}

export default TransfersTable;