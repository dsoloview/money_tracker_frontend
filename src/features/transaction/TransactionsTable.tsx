import {DataTable} from "@/widgets/table/DataTable.tsx";
import {useGetUserTransactions} from "@/api/endpoints/user/transaction/userTransaction.api.ts";
import {IParamTableGetRequest} from "@/models/request.model.ts";
import usePagination from "@/hooks/usePagination.ts";
import {useSorting} from "@/hooks/useSort.ts";
import {ITransaction} from "@/models/transaction.model.ts";
import CategoryBadge from "@/widgets/category/CategoryBadge.tsx";
import {formatDateTimeString} from "@/tools/date/date.helper.ts";
import {CategoryTransactionType} from "@/models/category.model.ts";
import useFilters from "@/hooks/useFilters.ts";
import TransactionTableFilters from "./TransactionTableFilters.tsx";
import useUserState from "@/hooks/useUserState.ts";
import i18next from "@/tools/language/language.ts";
import TransactionActions from "./TransactionActions.tsx";
import {Badge} from "@/ui/badge.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/ui/card.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "@/ui/button.tsx";

const columns = [
    {
        header: i18next.t('form.label.account'),
        accessor: 'account.name',
        cell: (row: ITransaction) => {
            return row.account.name;
        },
        enableSorting: false,
    },
    {
        header: i18next.t('form.label.amount'),
        accessor: 'amount',
        cell(row: ITransaction) {
            return (
                <b>
                    {row.amount} {row.account.currency.symbol}
                </b>
            )
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.categories'),
        accessor: 'categories',
        cell: (row: ITransaction) => {
            return (
                <div className="flex flex-row flex-wrap gap-3 items-center">
                    {row.categories.map((category) => (
                        <CategoryBadge key={category.id} category={category}/>
                    ))}
                </div>
            )
        },
        enableSorting: false,
    },
    {
        header: i18next.t('form.label.type'),
        accessor: 'type',
        cell: (row: ITransaction) => {
            return <Badge variant={row.type === CategoryTransactionType.EXPENSE ? "red" : "green"}>
                {row.type}
            </Badge>
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.date'),
        accessor: 'date',
        cell: (row: ITransaction) => {
            return formatDateTimeString(row.date);
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.actions'),
        accessor: 'column',
        cell: (row: ITransaction) => {
            return <TransactionActions
                transactionId={row.id}
            />
        },
        enableSorting: false,
    },
];

export type TransactionTableFiltersType = {
    account_id?: {
        '$eq'?: string;
    };
    type?: {
        '$eq'?: CategoryTransactionType;
    };
    amount?: {
        '$gte'?: string;
        '$lte'?: string;
    };
    date?: {
        '$gte'?: Date;
        '$lte'?: Date;
    };
}

const TransactionsTable = () => {
    const {pagination, onPaginationChange, resetPagination} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting();
    const {filters, onFilterChange, resetFilters} = useFilters<TransactionTableFiltersType>({
        onChange: resetPagination
    });

    const {t} = useTranslation();

    const user = useUserState();

    const {data, isLoading} = useGetUserTransactions({
        id: user.id,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        sort: field === 'undefined' ? 'id' : field,
        direction: order === 'undefined' ? 'desc' : order,
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
                        <TransactionTableFilters
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
                            {t('menu.transactions')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable<ITransaction>
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

export default TransactionsTable;