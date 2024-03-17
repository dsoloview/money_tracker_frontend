import {Flex, Stat, StatNumber, Text} from "@chakra-ui/react";
import {useGetUser} from "../../api/endpoints/user/user.api.ts";
import useAuthStore from "../../stores/authStore.ts";
import useUserState from "../../hooks/useUserState.ts";

const UserInfo = () => {
    const user = useUserState();
    const setUser = useAuthStore(state => state.setUser);
    const {data} = useGetUser(user.id);
    setUser(data.data);

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