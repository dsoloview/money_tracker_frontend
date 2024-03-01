import useAuthStore from "../../stores/authStore.ts";
import {useGetUserAccounts} from "../../api/endpoints/user/account/userAccount.api.ts";
import {Select} from "chakra-react-select";
import {Badge, Box, Flex, Text} from "@chakra-ui/react";

type Props = {
    id: string,
    name: string,
    onBlur: (e: unknown) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void

}
const AccountSelect = (
    {
        onBlur,
        setFieldValue,
        id,
        name
    }: Props) => {
    const user = useAuthStore(state => state.authData?.user);
    const {data, isLoading, isError} = useGetUserAccounts(user?.id || 0);

    if (isLoading) {
        return "Loading";
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }

    const options = data.data.map((account) => {
        let balanceColor = "black";
        if (account.balance < 0) {
            balanceColor = "red";
        } else if (account.balance > 0) {
            balanceColor = "green";
        }
        return {
            value: account.id,
            label: (
                <Flex justify="space-between" align="center">
                    <Box>
                        <Text as="span">{`${account.name}`}</Text>
                        <Badge ml="0.5rem" colorScheme={balanceColor === 'red' ? 'red' : 'green'}>
                            {`${account.currency.symbol} ${account.balance}`}
                        </Badge>
                    </Box>
                    <Box>
                        <Text as="span" color={balanceColor} fontSize="lg" fontWeight="bold" m={2}>
                            {`${account.currency.code}`}
                        </Text>
                    </Box>
                </Flex>
            )
        };
    });

    return (
        <Select
            id={id}
            name={name}
            options={options}
            onBlur={onBlur}
            onChange={(option: any) => setFieldValue("account_id", option.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            styles={{
                menu: base => ({...base, zIndex: 9999}),
                option: base => ({
                    ...base,
                    height: "50px",
                    display: "flex",
                    alignItems: "center"
                })
            }}
        />
    );
}

export default AccountSelect;
