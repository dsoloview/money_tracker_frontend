import {DataTable} from "../../widgets/table/DataTable.tsx";
import Pagination from "../../widgets/table/Pagination.tsx";
import useAuthStore from "../../stores/authStore.ts";
import {useState} from "react";
import {useGetUserTransactions} from "../../api/endpoints/user/transaction/userTransaction.api.ts";
import {IParamTableGetRequest} from "../../models/request.model.ts";
import {createColumnHelper} from "@tanstack/react-table";

type TransactionTableData = {
    id: number;
    amount: number;
    comment: string;
    type: string;
    created_at: string;
}

const TransactionsTable = () => {
    const user = useAuthStore(state => state.authData?.user);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('id' as 'id' | 'amount' | 'comment' | 'type' | 'created_at');
    const [direction, setDirection] = useState('asc' as 'asc' | 'desc');
    const {data} = useGetUserTransactions({
        id: user?.id || 0,
        page,
        sort,
        direction
    } as IParamTableGetRequest);


    const tableData: TransactionTableData[] = data.data.map(transaction => ({
        id: transaction.id,
        amount: transaction.amount,
        comment: transaction.comment,
        type: transaction.type,
        created_at: transaction.created_at,
    }));

    const columnHelper = createColumnHelper<TransactionTableData>();

    const columns = [
        columnHelper.accessor('id', {
            cell: (row) => row.getValue(),
            header: 'ID',
        }),
        columnHelper.accessor('amount', {
            cell: (row) => row.getValue(),
            header: 'Amount',
        }),
        columnHelper.accessor('comment', {
            cell: (row) => row.getValue(),
            header: 'Comment',
        }),
        columnHelper.accessor('type', {
            cell: (row) => row.getValue(),
            header: 'Type',
        }),
        columnHelper.accessor('created_at', {
            cell: (row) => row.getValue(),
            header: 'Created at',
        }),
    ];

    return (
        <>
            <DataTable data={tableData} columns={columns}/>
            <Pagination
                pageIndex={data.meta.current_page}
                pageCount={data.meta.last_page}
                gotoPage={(pageIndex) => {
                    setPage(pageIndex);
                }}
                nextPage={() => {
                    setPage((state) => {
                        return state + 1;
                    });
                }}
                previousPage={() => {
                    setPage((state) => {
                        return state - 1;
                    });
                }}
                canNextPage={data.meta.current_page < data.meta.last_page}
                canPreviousPage={data.meta.current_page > 1}


            />
        </>
    )
}

export default TransactionsTable;