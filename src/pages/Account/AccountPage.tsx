import AccountLayout from "@/layouts/AccountLayout.tsx";
import CreateAccountModal from "@/widgets/modals/CreateAccountModal.tsx";
import AccountsList from "@/features/account/AccountsList.tsx";
import {Suspense} from "react";
import {Skeleton} from "@/ui/skeleton.tsx";

export function AccountPage() {

    return (
        <AccountLayout>
            <h1>Accounts</h1>
            <Suspense fallback={[...Array(3).keys()].map(i => {
                return <Skeleton className="h-[100px] my-5" key={i}/>
            })}>
                <AccountsList/>
            </Suspense>
            <CreateAccountModal/>
        </AccountLayout>
    );
}

export default AccountPage;

