import {Box, Button, List, ListItem, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {ArrowRightIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import useAuthStore from "../../../stores/authStore.ts";
import {useGetUserAccounts} from "../../../api/endpoints/user/account/userAccount.api.ts";
import {useDeleteAccount} from "../../../api/endpoints/account/account.api.ts";
import {useState} from "react";
import UpdateAccountModal from "../../../widgets/modals/UpdateAccountModal.tsx";
import {IAccount} from "../../../models/account.model.ts";

const AccountsList = () => {
    const user = useAuthStore(state => state.authData?.user);
    const {data, isLoading} = useGetUserAccounts(user?.id || 0);
    const {mutate} = useDeleteAccount();
    const {onOpen, isOpen, onClose} = useDisclosure();
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleDelete = (accountId: number) => {
        mutate(accountId)
    }

    const handleEdit = (account: IAccount) => {
        setSelectedAccount(account);
        onOpen();
    }

    return (
        <Box>
            <List spacing={3}>
                {data?.data.map((account) => (
                    <ListItem key={account.id}>
                        <Box shadow="md" p={5} rounded="md" bg="white">
                            <Stack direction="row" align="center" justify="space-between">
                                <Stack direction="column">
                                    <Text fontSize="lg" fontWeight="bold">{account.name}</Text>
                                    <Text color="gray.500">{account.bank}</Text>
                                    <Text>{account.balance} {account.currency.symbol}</Text>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button colorScheme="red" onClick={() => handleDelete(account.id)}>
                                        <DeleteIcon/>
                                    </Button>
                                    <Button colorScheme="yellow" onClick={() => handleEdit(account)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button colorScheme="green">
                                        <ArrowRightIcon/>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </ListItem>
                ))}
            </List>
            {selectedAccount
                && <UpdateAccountModal
                    key={selectedAccount.id}
                    isOpen={isOpen}
                    onClose={onClose}
                    account={selectedAccount}/>
            }
        </Box>
    )
}

export default AccountsList;