import {ITransactionsInfo} from "@/models/transaction.model.ts";
import Statistics from "@/ui/statistics.tsx";
import {ArrowDownIcon, ArrowUpIcon} from "lucide-react";

type Props = {
    data?: ITransactionsInfo
}
const TransactionTableStatistics = ({data}: Props) => {
    if (!data) {
        return null;
    }
    return (
        <div
            className="flex justify-around mt-4">
            <Statistics
                icon={<ArrowUpIcon color="#36d938"/>}
                title="Total income"
                stat={`${data.total_income}${data.currency.symbol}`}
            />
            <Statistics
                icon={<ArrowDownIcon color="#f53838"/>}
                title="Total expense"
                stat={`${data.total_expense}${data.currency.symbol}`}
            />
            <Statistics
                title="Min transaction"
                stat={`${data.min_transaction}${data.currency.symbol}`}
            />
            <Statistics
                title="Max transaction"
                stat={`${data.max_transaction}${data.currency.symbol}`}
            />
        </div>
    )
}

export default TransactionTableStatistics;