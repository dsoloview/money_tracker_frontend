import useUserState from "@/hooks/useUserState.ts";
import {useDisclosure} from "@chakra-ui/react";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import CategoriesList from "./CategoriesList.tsx";
import {useGetUserCategoriesTree} from "@/api/endpoints/user/category/userCategory.api.ts";
import {Button} from "@/ui/button.tsx";
import {Accordion} from "@/ui/accordion.tsx";

const CategoriesTree = () => {
    const user = useUserState();
    const {data} = useGetUserCategoriesTree(user.id)
    const {onOpen, isOpen, onClose} = useDisclosure();
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
            <Button className="mt-4" onClick={onOpen}>Add Category</Button>
            <CreateCategoryModal isOpen={isOpen} onClose={onClose}/>
        </div>
    );
}

export default CategoriesTree;