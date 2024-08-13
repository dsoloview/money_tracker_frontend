import useUserState from "@/hooks/useUserState.ts";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import CategoriesList from "./CategoriesList.tsx";
import {useGetUserCategoriesTree} from "@/api/endpoints/user/category/userCategory.api.ts";
import {Accordion} from "@/ui/accordion.tsx";
import {useState} from "react";
import {Button} from "@/ui/button.tsx";

const CategoriesTree = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const user = useUserState();
    const {data} = useGetUserCategoriesTree(user.id)
    return (
        <div className="flex flex-col gap-4">
            <div className="p-4 border-2 rounded-lg">
                <h2>Income</h2>
                <Accordion type="multiple">
                    <CategoriesList categories={data.data.filter((category) => category.type === 'income')}/>
                </Accordion>
            </div>
            <div className={"p-4 border-2 rounded-lg"}>
                <h2>Expense</h2>
                <Accordion type="multiple">
                    <CategoriesList categories={data.data.filter((category) => category.type === 'expense')}/>
                </Accordion>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>Create Category</Button>
            <CreateCategoryModal isOpen={isCreateOpen} setIsOpen={setIsCreateOpen}/>
        </div>
    );
}

export default CategoriesTree;