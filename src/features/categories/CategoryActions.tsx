import {ICategory} from "../../models/category.model.ts";
import {Button, Flex, useDisclosure} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import React from "react";
import {useDeleteCategory} from "../../api/endpoints/category/category.api.ts";
import CreateCategoryModal from "../../widgets/modals/CreateCategoryModal.tsx";
import UpdateCategoryModal from "../../widgets/modals/UpdateCategoryModal.tsx";

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
        <Flex
            gap={2}
        >
            <Button disabled={isPending} onClick={handleEdit}><EditIcon/></Button>
            <Button disabled={isPending} onClick={handleDelete}><DeleteIcon/></Button>
            <Button disabled={isPending} onClick={handleCreate}>Add Subcategory</Button>
            <CreateCategoryModal isOpen={isOpenCreate} onClose={onCloseCreate}
                                 parentCategory={category}/>
            <UpdateCategoryModal isOpen={isOpenUpdate} onClose={onCloseUpdate} category={category}/>
        </Flex>
    );
}

export default CategoryActions;