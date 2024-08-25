type Props = {
    step: string
}
const TelegramConnectStep = ({step}: Props) => {
    return (
        <div
            className="flex items-start space-x-3 mb-4 last:mb-0"
        >
            <span className="flex h-4 w-4 rounded-full bg-sky-500 mt-1"/>
            <p className="text-sm text-gray-600">
                {step}
            </p>
        </div>
    )
}

export default TelegramConnectStep;