import {DataTable} from "../../widgets/table/DataTable.tsx";
import {useGetUserTransactions} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {IParamTableGetRequest} from "../../models/request.model.ts";
import usePagination from "../../hooks/usePagination.ts";
import {useSorting} from "../../hooks/useSort.ts";
import {ITransaction} from "../../models/transaction.model.ts";
import CategoryBadge from "../../widgets/category/CategoryBadge.tsx";
import {Badge, HStack} from "@chakra-ui/react";
import {formatDateTimeString} from "../../tools/date/date.helper.ts";
import {CategoryTransactionType} from "../../models/category.model.ts";
import useFilters from "../../hooks/useFilters.ts";
import TransactionTableFilters from "./TransactionTableFilters.tsx";
import useUserState from "../../hooks/useUserState.ts";
import i18next from "i18next";

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
                <Badge colorScheme={row.type === CategoryTransactionType.EXPENSE ? "red" : "green"}>
                    {row.amount} {row.account.currency.symbol}
                </Badge>
            )
        },
        enableSorting: true,
    },
    {
        header: i18next.t('form.label.categories'),
        accessor: 'categories',
        cell: (row: ITransaction) => {
            return (
                <HStack>
                    {row.categories.map((category) => (
                        <CategoryBadge key={category.id} category={category}/>
                    ))}
                </HStack>
            )
        },
        enableSorting: false,
    },
    {
        header: i18next.t('form.label.type'),
        accessor: 'type',
        cell: (row: ITransaction) => {
            return <Badge colorScheme={row.type === CategoryTransactionType.EXPENSE ? "red" : "green"}>
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
];

export type TransactionTableFiltersType = {
    account_id?: {
        '$eq'?: number;
    };
    type?: {
        '$eq'?: CategoryTransactionType;
    };
    amount?: {
        '$gte'?: number;
        '$lte'?: number;
    };
}

const TransactionsTable = () => {
    const {pagination, onPaginationChange, resetPagination} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting("date", "desc");
    const {filters, onFilterChange, resetFilters} = useFilters<TransactionTableFiltersType>({
        onFiltersChange: resetPagination
    });

    const user = useUserState();

    const {data, isLoading} = useGetUserTransactions({
        id: user.id,
        page: pagination.pageIndex + 1,
        sort: field,
        direction: order,
        filters: filters
    } as IParamTableGetRequest);

    return (
        <>
            <TransactionTableFilters
                filters={filters}
                onFiltersChange={onFilterChange}
                resetFilters={resetFilters}
                minAmount={data?.min_amount || 0}
                maxAmount={data?.max_amount || 0}
                isLoading={isLoading}

            />
            <DataTable<ITransaction>
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

export default TransactionsTable;