import AccountLayout from "@/layouts/AccountLayout.tsx";
import CreateAccountModal from "@/widgets/modals/CreateAccountModal.tsx";
import AccountsList from "@/features/account/AccountsList.tsx";
import {Suspense, useState} from "react";
import {Skeleton} from "@/ui/skeleton.tsx";
import Title from "@/widgets/texts/Title.tsx";
import {Button} from "@/ui/button.tsx";
import {Plus} from "lucide-react";

export function AccountPage() {
    const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);

    return (
        <AccountLayout>
            <div className="flex items-center justify-between">
                <Title>Accounts</Title>
                <Button onClick={() => setCreateAccountModalOpen(true)} variant="blue">
                    <Plus/>
                </Button>
            </div>

            <Suspense fallback={[...Array(3).keys()].map(i => {
                return <Skeleton className="h-[100px] my-5" key={i}/>
            })}>
                <AccountsList/>
            </Suspense>
            <CreateAccountModal isOpen={createAccountModalOpen} setIsOpen={setCreateAccountModalOpen}/>
        </AccountLayout>
    );
}

export default AccountPage;

