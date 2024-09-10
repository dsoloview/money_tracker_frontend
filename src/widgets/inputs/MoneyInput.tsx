import {Input, InputProps} from "@/ui/input.tsx";
import {RefAttributes} from "react";

const MoneyInput = (props: InputProps & RefAttributes<HTMLInputElement>) => {

    return (
        <div className="flex w-full items-center space-x-2">
            <Input
                type="number"
                {...props}
            />
        </div>
    )
}

export default MoneyInput;