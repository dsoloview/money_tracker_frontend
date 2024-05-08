export interface ISelectProps {
    placeholder?: string
    id?: string
    name?: string
    value: string
    onChange: (value: string) => void
    hasError?: boolean
    errorMessage?: string
    required?: boolean
    onBlur?: (e: unknown) => void
    className?: string
}