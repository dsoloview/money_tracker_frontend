import {DataTable} from "../../widgets/table/DataTable.tsx";
import useAuthStore from "../../stores/authStore.ts";
import {useGetUserTransactions} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {IParamTableGetRequest} from "../../models/request.model.ts";
import usePagination from "../../hooks/usePagination.ts";
import {useSorting} from "../../hooks/useSort.ts";
import {ITransaction} from "../../models/transaction.model.ts";

const columns = [
    {
        header: "ID",
        accessor: "id",
        meta: {
            isNumeric: true,
        },
    },
    {
        header: "Amount",
        accessor: "amount",
        meta: {
            isNumeric: true,
        },
    },
    {
        header: "Date",
        accessor: "created_at",
    },
    {
        header: "Type",
        accessor: "type",
    },
    {
        header: "Status",
        accessor: "status",
    },
];
const TransactionsTable = () => {
    const user = useAuthStore(state => state.authData?.user);
    const {pagination, onPaginationChange} = usePagination();
    const {sort, onSortingChange, field, order} = useSorting("id", "ASC");

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