import {ReactNode} from "react";

type Props = {
    children: ReactNode

}
export default function Container({children}: Props) {
    return (
        <div className="p-4 container">
            {children}
        </div>
    )
}