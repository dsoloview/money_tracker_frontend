import {ButtonGroupItem} from "@/ui/button-group.tsx";

type Props = {
    value: string;
    label: string;
}
const RadioCard = ({value, label}: Props) => {
    return (
        <div>
            <ButtonGroupItem label={label} value={value}/>
        </div>
    )
}

export default RadioCard;
