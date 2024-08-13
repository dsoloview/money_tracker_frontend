import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import {cn} from "../lib/utils";

const ButtonGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({className, ...props}, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("flex gap-3", className)}
            {...props}
            ref={ref}
        />
    );
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    {
        icon?: React.ReactNode;
        label: string;
    } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({className, icon, label, ...props}, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "border shadow-md data-[state=checked]:bg-teal-600 data-[state=checked]:text-white px-10 py-4 text-center rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <div className="flex flex-col justify-center">
                {icon && <div className="self-center">{icon}</div>}
                <div className="text-base">{label}</div>
            </div>
        </RadioGroupPrimitive.Item>
    );
});
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export {ButtonGroup, ButtonGroupItem};