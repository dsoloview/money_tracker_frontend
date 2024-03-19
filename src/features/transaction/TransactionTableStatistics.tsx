import {Card, CardBody, Flex, Stat, StatArrow, StatLabel, StatNumber} from "@chakra-ui/react";
import {ITransactionsInfo} from "../../models/transaction.model.ts";

type Props = {
    data?: ITransactionsInfo
}
const TransactionTableStatistics = ({data}: Props) => {
    if (!data) {
        return null;
    }
    return (
        <Flex
            justifyContent="space-around"
            mt={4}
        >
            <Card>
                <CardBody>
                    <Stat>
                        <StatLabel>Total income</StatLabel>
                        <StatNumber><StatArrow type='increase'/>{data.total_income}{data.currency.symbol}</StatNumber>
                    </Stat>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Stat>
                        <StatLabel>Total expense</StatLabel>
                        <StatNumber><StatArrow type='decrease'/>{data.total_expense}{data.currency.symbol}</StatNumber>
                    </Stat>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Stat>
                        <StatLabel>Min transaction</StatLabel>
                        <StatNumber>{data.min_transaction}{data.currency.symbol}</StatNumber>
                    </Stat>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Stat>
                        <StatLabel>Max transaction</StatLabel>
                        <StatNumber>{data.max_transaction}{data.currency.symbol}</StatNumber>
                    </Stat>
                </CardBody>
            </Card>
        </Flex>
    )
}

export default TransactionTableStatistics;