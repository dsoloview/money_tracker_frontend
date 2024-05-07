import {ICategory} from "@/models/category.model.ts";
import {useDisclosure} from "@chakra-ui/react";
import React from "react";
import {useDeleteCategory} from "@/api/endpoints/category/category.api.ts";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import UpdateCategoryModal from "@/widgets/modals/UpdateCategoryModal.tsx";
import {Button} from "@/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";

type Props = {
    category: ICategory;
}
const CategoryActions = ({category}: Props) => {
    const {onOpen: onOpenCreate, isOpen: isOpenCreate, onClose: onCloseCreate} = useDisclosure();
    const {onOpen: onOpenUpdate, isOpen: isOpenUpdate, onClose: onCloseUpdate} = useDisclosure();

    const {mutate, isPending} = useDeleteCategory();


    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onOpenUpdate();
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        mutate(category.id)
    }

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onOpenCreate();

    }
    return (
        <div className="flex gap-2 mr-2">
            <Button variant="outline" disabled={isPending} onClick={handleEdit}><Pencil/></Button>
            <Button variant="outline" disabled={isPending} onClick={handleDelete}><Trash2/></Button>
            <Button variant="outline" disabled={isPending} onClick={handleCreate}>Add Subcategory</Button>
            <CreateCategoryModal isOpen={isOpenCreate} onClose={onCloseCreate}
                                 parentCategory={category}/>
            <UpdateCategoryModal isOpen={isOpenUpdate} onClose={onCloseUpdate} category={category}/>
        </div>
    );
}

export default CategoryActions;