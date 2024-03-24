import React from "react";
import {ICategory} from "../../models/category.model.ts";
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    Flex,
    useDisclosure
} from "@chakra-ui/react";
import CategoriesList from "./CategoriesList.tsx";
import CategoryAvatar from "../../widgets/category/CategoryAvatar.tsx";
import CreateCategoryModal from "../../widgets/modals/CreateCategoryModal.tsx";

const CategoryItem: React.FC<{ category: ICategory }> = ({category}) => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const handleAddSubcategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onOpen();
    }

    return (
        <AccordionItem>
            <AccordionButton as="div">
                <Flex
                    flex='1'
                    alignItems='center'
                    gap={4}
                >
                    <CategoryAvatar category={category} showBorder/>
                    {category.name}
                </Flex>
                <Flex
                    align="center"
                    gap={4}
                >
                    <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
                    <CreateCategoryModal isOpen={isOpen} onClose={onClose} parentCategory={category}/>
                    <AccordionIcon/>
                </Flex>
            </AccordionButton>
            <AccordionPanel>
                {category.children && category.children.length > 0 ? (<CategoriesList categories={category.children}/>
                ) : (
                    <p>No Subcategories</p>
                )}
            </AccordionPanel>
        </AccordionItem>
    );
};

export default CategoryItem;