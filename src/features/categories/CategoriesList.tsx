import React from "react";
import {ICategory} from "@/models/category.model.ts";
import CategoryItem from "./CategoryItem.tsx";

const CategoriesList: React.FC<{ categories: ICategory[] }> = ({categories}) => {
    return categories.map((category) => (
        <CategoryItem key={category.id} category={category}/>
    ));
}

export default CategoriesList;