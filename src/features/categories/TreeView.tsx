import React from "react";
import {ICategory} from "../../models/category.model.ts";
import {Accordion} from "@chakra-ui/react";
import CategoriesList from "./CategoriesList.tsx";

const TreeView: React.FC<{ data: ICategory[] }> = ({data}) => {
    return (
        <Accordion allowMultiple>
            <CategoriesList categories={data}/>
        </Accordion>
    );
};

export default TreeView;