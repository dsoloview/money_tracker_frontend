import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Box, Flex, Heading, IconButton, Skeleton, useDisclosure} from "@chakra-ui/react";
import CreateAccountModal from "../../widgets/modals/CreateAccountModal.tsx";
import AccountsList from "../../features/account/components/AccountsList.tsx";
import {AddIcon} from "@chakra-ui/icons";
import {Suspense} from "react";

export function AccountPage() {
    const {onOpen, isOpen, onClose} = useDisclosure()

    return (
        <AccountLayout>
            <Heading size="lg">Accounts</Heading>
            <Suspense fallback={[...Array(3).keys()].map(i => {
                return <Skeleton key={i} height="100px" my={5}/>
            })}>
                <AccountsList/>
            </Suspense>
            <Box mt={5}>
                <Flex justifyContent="flex-end">
                    <IconButton
                        onClick={onOpen}
                        aria-label="Create AccountPage"
                        icon={<AddIcon/>}
                        colorScheme="blue"
                        size="lg"
                    />
                </Flex>
            </Box>
            <CreateAccountModal isOpen={isOpen} onClose={onClose}/>
        </AccountLayout>
    );
}

export default AccountPage;

