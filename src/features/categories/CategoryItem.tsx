import React from "react";
import {ICategory} from "@/models/category.model.ts";
import {Flex} from "@chakra-ui/react";
import CategoriesList from "./CategoriesList.tsx";
import CategoryAvatar from "../../widgets/category/CategoryAvatar.tsx";
import CategoryActions from "./CategoryActions.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/ui/accordion.tsx";

const CategoryItem: React.FC<{ category: ICategory }> = ({category}) => {
    return (
        <AccordionItem value={category.id.toString()}>
            <AccordionTrigger>
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
                </Flex>
            </AccordionTrigger>
            <AccordionContent>
                {category.children && category.children.length > 0 ? (<CategoriesList categories={category.children}/>
                ) : (
                    <p>No Subcategories</p>
                )}
            </AccordionContent>
        </AccordionItem>
    );
};

export default CategoryItem;