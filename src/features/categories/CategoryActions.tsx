import {ICategory} from "@/models/category.model.ts";
import React from "react";
import {useDeleteCategory} from "@/api/endpoints/category/category.api.ts";
import CreateCategoryModal from "@/widgets/modals/CreateCategoryModal.tsx";
import UpdateCategoryModal from "@/widgets/modals/UpdateCategoryModal.tsx";
import {CirclePlus, Edit, Trash2} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/ui/dropdown-menu.tsx";
import {Button} from "@/ui/button.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    category: ICategory;
}
const CategoryActions = ({category}: Props) => {
    const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const {mutate} = useDeleteCategory();
    const {t} = useTranslation();


    const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        mutate(category.id)
    }

    const handleUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsUpdateOpen(true);
    }

    const handleCreate = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsCreateOpen(true);
    }


    return (
        <>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{t('button.actions')}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={handleUpdate}
                            className="flex items-center justify-between">{t('button.update')}<Edit/></DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleCreate}
                            className="flex items-center justify-between">{t('button.create')}<CirclePlus/></DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="flex items-center justify-between">{t('button.delete')}<Trash2/></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <UpdateCategoryModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} category={category}/>
            <CreateCategoryModal isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} parentCategory={category}/>
        </>
    );
}

export default CategoryActions;