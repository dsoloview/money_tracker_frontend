import {ICategory} from "@/models/category.model.ts";
import React from "react";
import {useDeleteCategory} from "@/api/endpoints/category/category.api.ts";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import UpdateCategoryModal from "@/widgets/modals/UpdateCategoryModal.tsx";
import {Button} from "@/ui/button.tsx";
import {CirclePlus, Edit, Trash2} from "lucide-react";

type Props = {
    category: ICategory;
}
const CategoryActions = ({category}: Props) => {
    const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const {mutate, isPending} = useDeleteCategory();


    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        mutate(category.id)
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsUpdateOpen(true);
    }

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsCreateOpen(true);
    }


    return (
        <div className="flex gap-2 mr-2 items-center">
            <Button variant="outline" disabled={isPending} onClick={handleCreate}><CirclePlus/></Button>
            <Button variant="outline" disabled={isPending} onClick={handleUpdate}><Edit/></Button>
            <Button variant="outline" disabled={isPending} onClick={handleDelete}><Trash2/></Button>
            <UpdateCategoryModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} category={category}/>
            <CreateCategoryModal isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} parentCategory={category}/>
        </div>
    );
}

export default CategoryActions;