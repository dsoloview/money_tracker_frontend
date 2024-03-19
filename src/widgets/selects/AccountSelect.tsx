import {useGetUserAccounts} from "../../api/endpoints/user/account/userAccount.api.ts";
import {Select} from "chakra-react-select";
import {Badge, Box, Flex, Text} from "@chakra-ui/react";
import useUserState from "../../hooks/useUserState.ts";

type Props = {
    id: string,
    name: string,
    onBlur?: (e: unknown) => void
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void
    onChange?: (option: any) => void
    placeholder?: string,
    defaultValue?: number

}
const AccountSelect = (
    {
        onBlur,
        setFieldValue,
        id,
        name,
        onChange,
        placeholder,
        defaultValue
    }: Props) => {
    const user = useUserState();
    const {data, isLoading} = useGetUserAccounts(user.id);

    let options: { value: number, filterValue: string, label: JSX.Element }[] = [];

    if (data) {
        options = data.data.map((account) => {
            let balanceColor = "black";
            if (account.balance < 0) {
                balanceColor = "red";
            } else if (account.balance > 0) {
                balanceColor = "green";
            }
            return {
                value: account.id,
                filterValue: account.name,
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
    }

    const handleChange = (option: any) => {
        if (setFieldValue) {
            setFieldValue(name, option?.value);
            return;
        }

        if (onChange) {
            onChange(option?.value);
            return;
        }
    }

    const filterOptions = (
        candidate: { label: string; value: string; data: any },
        input: string
    ) => {
        if (input) {
            return candidate.data.filterValue.toLowerCase().includes(input.toLowerCase());
        }
        return true;
    };

    return (
        <Select
            isLoading={isLoading}
            id={id}
            name={name}
            options={options}
            onBlur={onBlur}
            filterOption={filterOptions}
            onChange={handleChange}
            isClearable={true}
            placeholder={placeholder}
            defaultValue={options.find((option) => option.value == defaultValue)}
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
