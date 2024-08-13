import React from "react";
import {ICategory} from "@/models/category.model.ts";
import CategoriesList from "./CategoriesList.tsx";
import CategoryAvatar from "@/widgets/category/CategoryAvatar.tsx";
import CategoryActions from "./CategoryActions.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/ui/accordion.tsx";

const CategoryItem: React.FC<{ category: ICategory }> = ({category}) => {
    return (
        <AccordionItem value={category.id.toString()}>
            <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <CategoryAvatar name={category.name} icon={category.icon?.path}/>
                        {category.name}
                    </div>
                    <div className="flex items-center gap-4">
                        <CategoryActions category={category}/>
                    </div>
                </div>
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