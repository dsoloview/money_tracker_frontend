import AccountLayout from "../../layouts/AccountLayout.tsx";
import {Heading, Skeleton} from "@chakra-ui/react";
import CreateAccountModal from "../../widgets/modals/CreateAccountModal.tsx";
import AccountsList from "../../features/account/components/AccountsList.tsx";
import {Suspense} from "react";

export function AccountPage() {

    return (
        <AccountLayout>
            <Heading size="lg">Accounts</Heading>
            <Suspense fallback={[...Array(3).keys()].map(i => {
                return <Skeleton key={i} height="100px" my={5}/>
            })}>
                <AccountsList/>
            </Suspense>
            <CreateAccountModal/>
        </AccountLayout>
    );
}

export default AccountPage;

