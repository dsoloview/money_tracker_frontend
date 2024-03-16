import {Flex, Stat, StatNumber, Text} from "@chakra-ui/react";
import {useGetUser} from "../../api/endpoints/user/user.api.ts";
import useAuthStore from "../../stores/authStore.ts";

const UserInfo = () => {
    const user = useAuthStore(state => state.authData?.user);
    const setUser = useAuthStore(state => state.setUser);
    const {data} = useGetUser(user?.id || 0);
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