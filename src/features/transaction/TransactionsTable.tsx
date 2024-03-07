import {DataTable} from "../../widgets/table/DataTable.tsx";
import useAuthStore from "../../stores/authStore.ts";
import {useGetUserTransactions} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {IParamTableGetRequest} from "../../models/request.model.ts";
import usePagination from "../../hooks/usePagination.ts";
import {useSorting} from "../../hooks/useSort.ts";
import {ITransaction} from "../../models/transaction.model.ts";
import CategoryBadge from "../../widgets/category/CategoryBadge.tsx";
import {Badge, HStack} from "@chakra-ui/react";
import {formatDateTimeString} from "../../tools/date/date.helper.ts";
import {CategoryTransactionType} from "../../models/category.model.ts";

const columns = [
    {
        header: "Account",
        accessor: 'account.name',
        cell: (row: ITransaction) => {
            return row.account.name;
        },
        enableSorting: false,
    },
    {
        header: "Amount",
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
        header: "Category",
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
        header: "Type",
        accessor: 'type',
        cell: (row: ITransaction) => {
            return <Badge colorScheme={row.type === CategoryTransactionType.EXPENSE ? "red" : "green"}>
                {row.type}
            </Badge>
        },
        enableSorting: true,
    },
    {
        header: "Date",
        accessor: 'date',
        cell: (row: ITransaction) => {
            return formatDateTimeString(row.date);
        },
        enableSorting: true,
    },
];
const TransactionsTable = () => {
    const user = useAuthStore(state => state.authData?.user);
    const {pagination, onPaginationChange} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting("date", "desc");

    const {data, isLoading} = useGetUserTransactions({
        id: user?.id || 0,
        page: pagination.pageIndex + 1,
        sort: field,
        direction: order,
    } as IParamTableGetRequest);

    return (
        <>
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