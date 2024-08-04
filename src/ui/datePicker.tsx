"use client"

import {addDays, format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/ui/button"
import {Calendar} from "@/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/ui/select"

type Props = {
    value: Date;
    onChange: (value: Date) => void;
}

export function DatePicker({value, onChange}: Props) {

    const setDate = (value: string) => {
        onChange(addDays(new Date(), parseInt(value, 10)))
    }

    const handleChange = (date: Date | undefined) => {
        if (date) {
            onChange(date)
        }
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2 pointer-events-auto">
                <Select
                    onValueChange={(value) =>
                        setDate(value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select"/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleChange}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
