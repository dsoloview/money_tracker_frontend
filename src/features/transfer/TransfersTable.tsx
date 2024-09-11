import {DataTable} from "@/widgets/table/DataTable.tsx";
import {IParamTableGetRequest} from "@/models/request.model.ts";
import usePagination from "@/hooks/usePagination.ts";
import {useSorting} from "@/hooks/useSort.ts";
import {formatDateTimeString} from "@/tools/date/date.helper.ts";
import useFilters from "@/hooks/useFilters.ts";
import useUserState from "@/hooks/useUserState.ts";
import i18next from "@/tools/language/language.ts";
import {ITransfer} from "@/models/transfer.model.ts";
import {useGetUserTransfers} from "@/api/endpoints/user/transfer/userTransfer.api.ts";
import TransferTableFilters from "./TransferTableFilters.tsx";
import {Badge} from "@/ui/badge.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/ui/card.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "@/ui/button.tsx";

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
                <Badge variant="red">
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
                <Badge variant="green">
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
        '$eq'?: string;
    };
    account_to_id?: {
        '$eq'?: string;
    };
}

const TransfersTable = () => {
    const {pagination, onPaginationChange, resetPagination} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting();
    const {filters, onFilterChange, resetFilters} = useFilters<TransferTableFiltersType>({
        onChange: resetPagination
    });
    const {t} = useTranslation();

    const user = useUserState();

    const {data, isLoading} = useGetUserTransfers({
        id: user.id,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        sort: field,
        direction: order,
        filters: filters
    } as IParamTableGetRequest);

    return (
        <div className="grid grid-cols-[300px_1fr] gap-3 min-h-800px">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {t('form.label.filters')}
                        <Button onClick={resetFilters}>{t('button.reset')}</Button>
                    </CardTitle>
                    <CardContent className="p-0">
                        <TransferTableFilters
                            filters={filters}
                            onFiltersChange={onFilterChange}
                            resetFilters={resetFilters}
                            isLoading={isLoading}
                        />
                    </CardContent>
                </CardHeader>
            </Card>
            <div>
                <Card className="min-h-[700px]">
                    <CardHeader>
                        <CardTitle>
                            {t('menu.transfers')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable<ITransfer>
                            data={data?.data || []}
                            columns={columns}
                            pagination={pagination}
                            onPaginationChange={onPaginationChange}
                            pageCount={data?.meta.last_page || 0}
                            rowCount={data?.meta.total || 0}
                            sort={sort}
                            onSortingChange={onSortingChange}
                            isLoading={isLoading}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default TransfersTable;