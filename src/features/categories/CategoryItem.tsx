import React from "react";
import {ICategory} from "../../models/category.model.ts";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex} from "@chakra-ui/react";
import CategoriesList from "./CategoriesList.tsx";
import CategoryAvatar from "../../widgets/category/CategoryAvatar.tsx";
import CategoryActions from "./CategoryActions.tsx";

const CategoryItem: React.FC<{ category: ICategory }> = ({category}) => {
    return (
        <AccordionItem>
            <AccordionButton as="div">
                <Flex
                    flex='1'
                    alignItems='center'
                    gap={4}
                >
                    <CategoryAvatar name={category.name} icon={category.icon?.path}/>
                    {category.name}
                </Flex>
                <Flex
                    align="center"
                    gap={4}
                >
                    <CategoryActions category={category}/>
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