import {Flex, Stat, StatNumber, Text} from "@chakra-ui/react";
import {useGetUser} from "../../api/endpoints/user/user.api.ts";
import useUserState from "../../hooks/useUserState.ts";

const UserInfo = () => {
    const user = useUserState();
    const {data} = useGetUser(user.id);

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            mr={4}
        >
            <Text>{data.data.name}</Text>
            <Stat>
                <StatNumber>{data.data.balance}{data.data.settings.main_currency.symbol}</StatNumber>
            </Stat>
        </Flex>

    )
}

export default UserInfo;