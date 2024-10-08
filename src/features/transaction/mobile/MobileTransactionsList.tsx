import usePagination from "@/hooks/table/usePagination.ts";
import useFilters from "@/hooks/table/useFilters.ts";
import useUserState from "@/hooks/useUserState.ts";
import {useGetUserTransactions} from "@/api/endpoints/user/transaction/userTransaction.api.ts";
import TransactionListItem from "@/features/transaction/mobile/TransactionListItem.tsx";
import {ITransaction} from "@/models/transaction.model.ts";
import SkeletonList from "@/widgets/skeleton/SkeletonList.tsx";
import MobilePagination from "@/widgets/pagination/MobilePagination.tsx";
import MobileTransactionFilters from "@/features/transaction/mobile/MobileTransactionFilters.tsx";
import Title from "@/widgets/texts/Title.tsx";
import {useSorting} from "@/hooks/table/useSort.ts";

const MobileTransactionsList = () => {
    const {pagination, onMobilePaginationChange, resetPagination} = usePagination();
    const {field, order} = useSorting();
    const {filters, onFilterChange, resetFilters} = useFilters({onChange: resetPagination});
    const user = useUserState();

    const {data, isLoading} = useGetUserTransactions({
        id: user.id,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        sort: field === 'undefined' ? 'id' : field,
        direction: order === 'undefined' ? 'desc' : order,
        filters,
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Title>Transactions</Title>
                <MobileTransactionFilters
                    filters={filters}
                    onFiltersChange={onFilterChange}
                    resetFilters={resetFilters}
                    isLoading={isLoading}
                />
            </div>
            <div className="space-y-4 px-4">
                {isLoading ? (
                    <SkeletonList count={10}/>
                ) : (
                    data?.data.map((transaction: ITransaction) => (
                        <TransactionListItem key={transaction.id} transaction={transaction}/>
                    ))
                )}
            </div>
            <MobilePagination
                pagination={pagination}
                pageCount={data?.meta.last_page || 0}
                onPaginationChange={onMobilePaginationChange}
            />
        </>
    );
}

export default MobileTransactionsList;