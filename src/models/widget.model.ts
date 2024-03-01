import {ChangeEvent} from "react";

export interface ISelectProps {
    placeholder?: string
    id?: string
    name?: string
    value: number
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    hasError?: boolean
    errorMessage?: string
    required?: boolean
    onBlur?: (e: unknown) => void
    className?: string
}